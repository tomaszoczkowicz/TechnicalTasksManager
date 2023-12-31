import { Profile } from '../../app/models/profile';
import { observer } from 'mobx-react-lite';
import { Card, Grid, Icon, Image, } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import FollowButton from './FollowButton';

interface Props {
    profile: Profile;
}


export default observer(function ProfileCard({profile}: Props){
    const { activityStore } = useStore();
    const { sumOfUserActivitiesHosted} = activityStore;

    function truncate(str: string | undefined) {
        if (str) {
        return str.length > 40 ? str.substring(0, 37) + '...' : str;
        }
        }

    return(
        <Card as={Link} to={`/profiles/${profile.username}`} >
            <Image src={profile.image || '/assets/user.png'} />
            <Card.Content>
                <Card.Header>{profile.displayName}</Card.Header>
                <Card.Description>{truncate(profile.bio)}</Card.Description>
            </Card.Content>
            <Card.Content extra >
                
                {/*my module*/}
                <Grid columns = {2}>
                <Grid.Row>
                 <Grid.Column>
                    <Icon name='sign-in' />
                    założone: &nbsp;
                    {sumOfUserActivitiesHosted(profile.username)}
                </Grid.Column>
                <Grid.Column>
                    <Icon name='hourglass half' />
                    w toku:  &nbsp;
                    {profile.tasksResponsibledCount}
                </Grid.Column>
                </Grid.Row>
                <Grid.Row columns = {1}>
                    <Grid.Column  >
                    <Icon name='user' />
                    Obserowany przez: {profile.followersCount} 
                    </Grid.Column>
                    
                </Grid.Row>
                </Grid>
                
            </Card.Content>
            <FollowButton profile={profile}/>
        </Card>
    )
})