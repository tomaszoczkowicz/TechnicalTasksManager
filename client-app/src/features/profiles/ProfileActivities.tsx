import React, { SyntheticEvent, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Grid, Header, Card, Image, TabProps, List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { UserActivity } from "../../app/models/profile";
import { format } from "date-fns";
import { useStore } from "../../app/stores/store";

const panes = [
  { menuItem: "Do zrobienia", pane: { key: "todo" } },
  { menuItem: "Wykonane", pane: { key: "done" } },
  { menuItem: "Założone", pane: { key: "hosting" } },
];

export default observer(function ProfileActivities() {
  const { profileStore } = useStore();
  const { loadUserActivities, profile, loadingActivities, userActivities } = profileStore;
  useEffect(() => {
    loadUserActivities(profile!.username);
  }, [loadUserActivities, profile]);

  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    loadUserActivities(
      profile!.username,
      panes[data.activeIndex as number].pane.key
    );
  };
  return (
    <Tab.Pane loading={loadingActivities}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content={"Activities"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <List animated relaxed = 'very'>
            {userActivities.map((activity: UserActivity) => (
              <List.Item as={Link}
              to={`/activities/${activity.id}`}
              key={activity.id}>
              
              
                <List.Content>
                  <List.Header textAlign="center">{activity.title}</List.Header>
                  <List.Description textAlign="center"> 
                    <div>{format(new Date(activity.date), "dd MMM yyyy")}</div>
                    
                  </List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
