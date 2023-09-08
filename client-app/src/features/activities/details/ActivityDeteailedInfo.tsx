import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon, GridColumn} from 'semantic-ui-react'
import {Activity} from "../../../app/models/activity";
import { format } from 'date-fns';
import pl from 'date-fns/locale/pl';

interface Props {
    activity: Activity
}

export default observer(function ActivityDetailedInfo({activity}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{activity.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='teal'/>
                    </Grid.Column>
                    
                    <Grid.Column width={15}>
                        
            <span>
              {format(activity.date!, 'dd MMM yyyy h:mm', {locale: pl})}
            </span>
            
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    
                    <Grid.Column width={1}>
                        <Icon name='industry' size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        
                        <span>
                        {activity.category}
                        </span>
            
                    </Grid.Column>
                    
                    <Grid.Column width={1}>
                        <Icon name='exclamation circle' size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        
                        <span>
                        {activity.priority}
                        </span>
            
                    </Grid.Column>
                    <Grid.Column width={1}>
                        <Icon name='hourglass half' size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        
                        <span>
                        {activity.status}
                        </span>
            
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})