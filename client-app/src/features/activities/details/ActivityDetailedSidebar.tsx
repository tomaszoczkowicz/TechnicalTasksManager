import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity;
}

export default observer(function ActivityDetailedSidebar ({activity: {attendees, host}}: Props) {
    if (!attendees) return null;

    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                {attendees.length} {attendees.length === 1? 'uczestnik' : 'uczestników'} bierze udział
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {attendees.slice()
                    .sort((a) => {
                        if(a.username == host?.username) return 1;
                        if(a.isResponsible) return 0;
                        else return -1;
                    })
                    .reverse()
                    .map(attendee => (
                        <Item style={{ position: 'relative' }} key={attendee.username}>

                        <Image size='tiny' src={attendee.image || '/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <Link to={`/profiles/${attendee.username}`}>{attendee.displayName}</Link>
                            </Item.Header>
                            {attendee.following &&
                            <p style={{ color: 'orange'}}>Obserwujesz</p>
                            }
                            <Item.Extra style={{ color: 'orange' }}>
                            {attendee.username === host?.username &&
                        <Label
                            style={{ position: 'absolute' }}
                            color='orange'
                            attached = 'top right'
                        >
                            Autor
                        </Label>}

                            {attendee.isResponsible === true &&
                        <Label
                            style={{ position: 'absolute' }}
                            color='blue'
                            attached = 'bottom right'         
                        >
                            Odpowiedzialny
                        </Label>}
                        
                        
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                    ))}
                </List>
            </Segment>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                Załączone zdjęcia
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {attendees
                    .map(attendee => (
                        <Item style={{ position: 'relative' }} key={attendee.username}>

                        <Image size='tiny' src={attendee.image || '/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3' color='teal'>
                                Opis zdjęcia
                            </Item.Header>
      
                            
                        </Item.Content>
                    </Item>
                    ))}
                </List>
            </Segment>
        </>

    )
})