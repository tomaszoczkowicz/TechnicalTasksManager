import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Activity, ActivityFormValues } from "../models/activity";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';
import { format } from "date-fns";
import pl from 'date-fns/locale/pl';
import { store } from "./store";
import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";


export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    loadingResponsibility = false;
    endDateVisible = true;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    predicate = new Map().set('all', true);

    constructor() {
        makeAutoObservable(this);
        reaction(
            () => this.predicate.keys(),
            () => {
                this.pagingParams = new PagingParams();
                this.activityRegistry.clear();
                this.loadActivities();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }
    
    setPredicate = (predicate: string, value: string | Date) => {
        const resetPredicate =() => {
            this.predicate.forEach((value, key) => {
                if (key !== 'startDate') this.predicate.delete(key);
                if (key !== 'search') this.predicate.delete(key);
            })
        }
        switch (predicate) {
            case 'all':
                resetPredicate();
                this.predicate.set('all', true);
                break;
            case 'isGoing':
                resetPredicate();
                this.predicate.set('isGoing', true);
                break;
            case 'isHost':
                resetPredicate();
                this.predicate.set('isHost', true);
                break;
            case 'startDate':
                this.predicate.delete('startDate');
                this.predicate.set('startDate', value);
                break;
            case 'search':
                this.predicate.delete('search');
                this.predicate.set('search', value);
                break;
        }
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        this.predicate.forEach((value, key) => {
            if(key === 'startDate') {
                params.append(key, (value as Date).toISOString())
            } else{
                params.append(key,value);
            }
        })
        return params;
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => 
        b.date!.getTime() - a.date!.getTime())
    }

    get groupedActivities(){
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, 'dd MMM yyyy', {locale: pl});
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key: string]: Activity[]})
        )
    }

    sumOfUserActivitiesHosted = (userId : string) => {
        const activities = Array.from(this.activityRegistry.values())
        let sumOfActivities =0;
        activities.forEach(activity => {
           if (activity.hostUsername === userId) sumOfActivities++;
        })
        return sumOfActivities;
    }

    sumOfUserActivitiesAttended = (userId : string) => {
        const activities = Array.from(this.activityRegistry.values())
        let sumOfActivities =0;
        activities.forEach(activity => {
           activity.attendees.forEach(attendee => {
            if(attendee.username === userId) sumOfActivities++;
           })
        })
        return sumOfActivities;
    }



    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const result = await agent.Activities.list(this.axiosParams);
            result.data.forEach(activity => {
                    this.setActivity(activity);
                  })
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
                this.setLoadingInitial(false);
            
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    loadActivity = async (id: string) => {
        let activity =this.getActivity(id);
        if(activity) {
            this.selectedActivity = activity;
            return activity;
        }
        else {
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(()=> this.selectedActivity = activity);
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private setActivity = (activity: Activity) => {
        const user = store.userStore.user;
        if(user){
            activity.isGoing = activity.attendees!.some(
                a => a.username === user.username
            )
            activity.isHost = activity.hostUsername === user.username;
            activity.host = activity.attendees?.find(x=> x.username === activity.hostUsername);
            activity.isResponsible = activity.attendees!.some(
                a => a.username === user.username && a.isResponsible === true
            )
        }
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }



    createActivity = async (activity: ActivityFormValues) => {
        const user = store.userStore.user;
        const attendee = new Profile(user!);
        try {
            await agent.Activities.create(activity);
            const newActivity = new Activity(activity);
            newActivity.hostUsername = user!.username;
            newActivity.attendees= [attendee];
            this.setActivity(newActivity);
            runInAction(() => {
                this.selectedActivity = newActivity;
            })    
        } catch (error) {
            console.log(error); 
        }
    }
updateActivity = async (activity: ActivityFormValues) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                if(activity.id)
                {
                    let updatedActivity = {...this.getActivity(activity.id), ...activity}
                    this.activityRegistry.set(activity.id, updatedActivity as Activity);
                    this.selectedActivity = updatedActivity as Activity;
                    this.loading = false;
                }
                
            })   
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
}
deleteActivity = async (id: string) => {
    this.loading = true;
    try {
        await agent.Activities.delete(id);
        runInAction(() => {
            this.activityRegistry.delete(id);
            this.loading = false;
        })   
    } catch (error) {
        console.log(error);
            runInAction(() => {
                this.loading = false;
            })
    }
}
//TODO updateResponsibility
updateResponsibility = async () => {
    const user = store.userStore.user;
    this.loadingResponsibility = true;
    try {
        await agent.Activities.takeResponsibility(this.selectedActivity!.id);
        runInAction(() => {
            if (this.selectedActivity?.isResponsible) {
                this.selectedActivity.attendees.map(attendee => {
                    if(attendee.username === user?.username) attendee.isResponsible = false;
                })
                this.selectedActivity.isResponsible = false;      
            } else {
                this.selectedActivity!.attendees.map(attendee => {
                    if(attendee.username === user?.username) attendee.isResponsible = true;
                })
                this.selectedActivity!.isResponsible = true;
            }
            this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!)
        })
    } catch (error) {
        console.log(error);
    } finally {
        runInAction(() => this.loadingResponsibility = false);
    }
}
updateAttendance = async () => {
    const user = store.userStore.user;
    this.loading = true;
    try {
        await agent.Activities.attend(this.selectedActivity!.id);
        runInAction(() => {
            if (this.selectedActivity?.isGoing) {
                this.selectedActivity.attendees = this.selectedActivity.attendees?.filter(a => a.username !== user?.username);
                this.selectedActivity.isGoing = false;      
            } else {
                const attendee = new Profile(user!);
                this.selectedActivity?.attendees?.push(attendee);
                this.selectedActivity!.isGoing = true;
            }
            this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!)
        })
    } catch (error) {
        console.log(error);
    } finally {
        runInAction(() => this.loading = false);
    }
}
cancelActivityToggle = async () => {
    this.loading = true;
    try {
        await agent.Activities.attend(this.selectedActivity!.id);
        runInAction(() => {
            this.selectedActivity!.isCancelled = !this.selectedActivity?.isCancelled;
            this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
        })
    } catch (error) {
        console.log(error);
    } finally {
        runInAction(() => this.loading = false);
    }
}
clearSelectedActivity = () => {
    this.selectedActivity = undefined;
}
updateAttendeeFollowing = (username: string) => {
    this.activityRegistry.forEach(activity => {
        activity.attendees.forEach(attendee => {
            if (attendee.username === username) {
                attendee.following ? attendee.followersCount-- : attendee.followersCount++;
                attendee.following = !attendee.following;
            }
        })
    })
}
}