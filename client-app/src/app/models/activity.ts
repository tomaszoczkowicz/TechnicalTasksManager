import { Profile } from "./profile";

export interface Activity {
    id: string;
    title: string;
    date: Date | null;
    endDate: Date | null;
    description: string;
    category: string;
    priority: string;
    status: string;
    hostUsername: string;
    isCancelled: boolean;
    isGoing: boolean;
    isHost: boolean;
    isResponsible: boolean;
    host?: Profile;
    responsible?: Profile[];
    attendees: Profile[]
  }
  export class Activity implements Activity {
    constructor(init?: ActivityFormValues) {
      Object.assign(this, init);
    }
  }
  export class ActivityFormValues {
    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date: Date | null = null;
    endDate: Date | null = null;
    priority: string = '';
    status: string ='';
    constructor(activity?: ActivityFormValues) {
      if (activity) {
        this.id = activity.id;
        this.title = activity.title;
        this.category = activity.category;
        this.description = activity.description;
        this.date = activity.date;
        this.endDate = activity.endDate;
        this.status = activity.status;
        this.priority = activity.priority;
        
      }
    }
;  }