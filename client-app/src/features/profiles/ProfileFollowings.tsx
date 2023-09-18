import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../app/stores/store";
import { Link } from "react-router-dom";
import { Card, Grid, Header, List, Tab, Image } from "semantic-ui-react";
import ProfileCard from "./ProfileCard";

export default observer(function ProfileFollowings() {
  const { profileStore } = useStore();
  const { profile, followings, loadingFollowings, activeTab } = profileStore;

  return (
    <Tab.Pane loading={loadingFollowings}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={
              activeTab === 3
                ? `Osoby obserwujące ${profile?.displayName}`
                : `Osoby obserwowane przez ${profile?.displayName}`
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <List relaxed="very" size="large">
            {followings.map((profile) => (
              <List.Item key={profile.username}>
                <Image avatar src={profile.image || "/assets/user.png"} />
                <List.Content>
                  <List.Header as={Link} to={`/profiles/${profile.username}`}>
                    {profile.displayName}
                  </List.Header>
                  <List.Description>
                    {profile.bio}
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
