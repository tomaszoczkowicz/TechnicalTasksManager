import React from 'react';
import { Tab } from 'semantic-ui-react';
import ProfilePhotos from './ProfilePhotos';
import { observer } from 'mobx-react-lite';
import { Profile } from '../../app/models/profile';
import ProfileAbout from './ProfileAbout';
import ProfileFollowings from './ProfileFollowings';
import ProfileStore from '../../app/stores/profileStore';
import { useStore } from '../../app/stores/store';
import ProfileActivities from './ProfileActivities';

interface Props{
    profile: Profile;
}

export default observer(function ProfileContent({profile} : Props) {
    const {profileStore} = useStore();
    const panes = [
        {menuItem: 'O mnie', render: () => <ProfileAbout profile={profile}/>},
        {menuItem: 'Zdjecia', render: () => <ProfilePhotos profile={profile}/>},
        {menuItem: 'Zadania', render: () => <ProfileActivities />},
        {menuItem: 'Obserwujący', render: () => <ProfileFollowings/>},
        {menuItem: 'Obserwowani', render: () => <ProfileFollowings/>},
    ];
    return (
        <Tab 
            menu={{fluid: true, vertical: true}}
            menuPosition='right'
            panes={panes}
            onTabChange={(e,data) => profileStore.setActiveTab(data.activeIndex)}
        />
    )
})