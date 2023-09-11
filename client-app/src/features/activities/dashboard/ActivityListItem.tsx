import { Button, Grid, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import pl from 'date-fns/locale/pl';
import ActivityListItemAttendee from './ActivityListItemAttendee';

interface Props {
    activity: Activity
}

export default function ActivityListItem({activity}: Props){
    
        function truncate(str: string | undefined, length: number) {
        if (str) {
        return str.length > length ? str.substring(0, length) + '...' : str;
        }

        }
            return(
                    <Segment.Group>
                        <Segment>
                            {activity.isCancelled &&
                                <Label attached='top' color='red' content='Anulowane' style={{textAlign: 'center'}}/>
                            }
                            <Item.Group>
                                <Item>
                                    <Item.Image style = {{marginBottom: 5}} size='tiny' circular src={activity.host?.image || '/assets/user.png'}/>
                                    <Item.Content>
                                        <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                            {truncate(activity.title, 117)}
                                        </Item.Header>
                                        <Item.Description>Autor: <Link to={`/profiles/${activity.hostUsername}`}>{activity.host?.displayName}</Link></Item.Description>
                                        {activity.isHost && (
                                            <Item.Description>
                                                <Label basic color='green'>
                                                    Jesteś autorem
                                                </Label>
                                            </Item.Description>
                                        )}
                                        {activity.isGoing && !activity.isHost && !activity.isResponsible && (
                                            <Item.Description>
                                                <Label basic color='orange'>
                                                    Obserwujesz
                                                </Label>
                                            </Item.Description>
                                        )}
                                    </Item.Content>
                                </Item>

                                

                            </Item.Group>
                        </Segment>
                        <Segment>
                            
                            <Grid>
                                <Grid.Column width={4}>
                                <Icon name='clock' />{format(activity.date!, 'dd MMM yyyy h:mm',{locale: pl})}

                                </Grid.Column>
                                
                                <Grid.Column width={4}>
                                <Icon name='industry' />{activity.category}
                                    
                                </Grid.Column>
                               
                                <Grid.Column width={4}>
                                <Icon name='exclamation circle' />{activity.priority}
                                    
                                </Grid.Column>
                                
                                <Grid.Column width={4}>
                                <Icon name='hourglass half' />{activity.status}
                                    
                                </Grid.Column>
                                
                            </Grid>
                                
                            
                        </Segment>
                        <Segment secondary>
                            <ActivityListItemAttendee attendees={activity.attendees!}/>
                            <Button 
                            as={Link} 
                            to={`/activities/${activity.id}`}
                            color='teal'
                            floated='right'
                            content='Zobacz'
                            />
                        </Segment>
                        <Segment clearing>
                            <span>{truncate(activity.description, 460)}</span>
                            
                        </Segment>
                    </Segment.Group>
            )
}