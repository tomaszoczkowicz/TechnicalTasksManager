import { observer } from 'mobx-react-lite';
import React from 'react'
import {Button, Header, Item, Segment, Image, Label, Popup} from 'semantic-ui-react'
import {Activity} from "../../../app/models/activity";
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useStore } from '../../../app/stores/store';

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: '120px',
    color: 'white'
};

interface Props {
    activity: Activity
}

export default observer (function ActivityDetailedHeader({activity}: Props) {
    const {activityStore: {updateAttendance,updateResponsibility, cancelActivityToggle, loading, loadingResponsibility}} = useStore();
    function truncate(str: string | undefined, length: number) {
        if (str) {
        return str.length > length ? str.substring(0, length) + '...' : str;
        }

        }
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                {activity.isCancelled &&
                    <Label style={{position: 'absolute', zIndex: 1000, left: -14, top: 20}} ribbon color='red' content ='Anulowane'/>
                }
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle}/>
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                            <Popup wide="very"
                             hoverable
                             trigger={
                                <Header
                                    size='large'
                                    content={truncate(activity.title,100)}
                                    style={{color: 'white'}}
                                    floated='left'
                                />
                            }   
                            >
                            <Popup.Content>
                                {activity.title}
                            </Popup.Content>
            
                            </Popup>
                                <p>{`Priorytet: ${activity.priority}`}</p>
                                <p>
                                    Założone przez <strong><Link to={`/profiles/${activity.host?.username}`}>{activity.host?.displayName}</Link></strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {activity.isHost ? (
                    <>
                    <Button color={activity.isCancelled ? 'green' : 'red'} floated='left' basic
                    content={activity.isCancelled ? 'Wznów' : 'Anuluj zadanie'}
                    onClick={cancelActivityToggle}
                    loading={loading}
                    />
                    <Button color={activity.isResponsible ? 'red' : 'green'}  basic
                    content={activity.isResponsible ? 'Zrezygnuj' : 'Weź zadanie'}
                    onClick={updateResponsibility}
                    loading={loadingResponsibility}
                    />
                    <Button as={Link} disabled={activity.isCancelled} to={`/manage/${activity.id}`} color='orange' floated='right'>
                    Edytuj zadanie
                    </Button>
                    </>
                ) : activity.isGoing? (
                    <>
                    {!activity.isResponsible && <Button loading={loading} floated='left' onClick = {updateAttendance}>Anuluj udział</Button>}
                    <Button color={activity.isResponsible ? 'red' : 'green'}  basic 
                    content={activity.isResponsible ? 'Zrezygnuj' : 'Weź zadanie'}
                    onClick={updateResponsibility}
                    loading={loadingResponsibility}
                    />
                    {activity.isResponsible && <Button as={Link} disabled={activity.isCancelled} to={`/manage/${activity.id}`} color='orange' floated='right'> 
                    Edytuj zadanie
                    </Button>}
                    </>
                ) : (
                    <Button disabled={activity.isCancelled} 
                            loading={loading} onClick = {updateAttendance} 
                            color='teal'>Dołącz do zadania</Button>
                )}
            </Segment>
        </Segment.Group>
    )
})