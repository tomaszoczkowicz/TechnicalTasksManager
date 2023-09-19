import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Grid, Header, Card, TabProps } from "semantic-ui-react";
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
    loadUserActivities(profile!.username,panes[0 as number].pane.key);
    
  }, [loadUserActivities, profile]);

  const handleTabChange = ( data: TabProps) => {
    loadUserActivities(
      profile!.username,
      panes[data.activeIndex as number].pane.key
    );
  };

  function truncate(str: string | undefined, length: number) {
    if (str) {
    return str.length > length ? str.substring(0, length) + '...' : str;
    }

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
            onTabChange={( data) => handleTabChange( data)}
          />
          <br />
          <Card.Group itemsPerRow={1}>
            {userActivities.map((activity: UserActivity) => (
              <Card
                as={Link}
                to={`/activities/${activity.id}`}
                key={activity.id}
              >

                <Card.Content>
                  <Card.Header textAlign="left">{truncate(activity.title,117)}</Card.Header>
                  <Card.Description textAlign="left"> 
                    <div>{format(new Date(activity.date), "dd MMM yyyy")}</div>
                  </Card.Description>
                  <Card.Meta>
                    {activity.category}
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
