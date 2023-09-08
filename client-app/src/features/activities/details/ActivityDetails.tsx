import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";
import ActivityDetailedHeader from "./ActivityDeteailedHeader";
import ActivityDetailedInfo from "./ActivityDeteailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";


export default observer( function ActivityDetails() {

  const {activityStore} = useStore();
  const {selectedActivity: activity, loadActivity, loadingInitial,clearSelectedActivity} = activityStore; //żeby nie robić refaktoru nazw poniżej
  const {id} = useParams();

  useEffect(()=> {
    if(id) loadActivity(id);
    return () => clearSelectedActivity();
  },[id, loadActivity, clearSelectedActivity])

    if (loadingInitial || !activity) return <LoadingComponent />; //kasowanie erroru, w ActivityDashboard upewniamy się, że activity !undefined
    return (
        <Grid>
          <Grid.Column width={10}>
            <ActivityDetailedHeader activity={activity}/>
            <ActivityDetailedInfo activity={activity}/>
            <ActivityDetailedChat activityId={activity.id}/>
          </Grid.Column>
          <Grid.Column width={6}>
            <ActivityDetailedSidebar activity={activity}/>
          </Grid.Column>
        </Grid>
    )
})