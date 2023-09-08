import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../app/stores/store';
import { Card, Grid, Header, Tab } from 'semantic-ui-react';
import ProfileCard from './ProfileCard';

export default observer(function ProfileFollowings () {
    const {profileStore} = useStore();
    const {profile, followings, loadingFollowings, activeTab} = profileStore;


    return (
        <Tab.Pane loading = {loadingFollowings}>
            <Grid>
                <Grid.Column width={16}>
                    <Header 
                    floated='left' 
                    icon='user' 
                    content={activeTab === 3 ? `Osoby obserwujące ${profile?.displayName}` : `Osoby obserwowane przez ${profile?.displayName}`}/>
                </Grid.Column>
                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={3}>
                        {followings.map(profile => (
                            <ProfileCard key={profile.username} profile={profile}/>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})