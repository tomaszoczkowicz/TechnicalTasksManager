import { observer } from 'mobx-react-lite';
import React from 'react';
import Calendar from 'react-calendar';
import { Header, Input, Menu } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityFiltersSearch from './ActivityFiltersSearch';

export default observer(function ActivityFilters(){
    const {activityStore: {predicate, setPredicate}} = useStore();
    return (
        <>

        <Menu vertical size='large' style={{width: '100%', marginTop: 25}}>
            <Header icon='filter' attached color='teal' content='Filtry'/>
            <Menu.Item 
            content='Wszystkie zadania' 
            active={predicate.has('all')} 
            onClick={() => setPredicate('all', 'true')}
            />
            <Menu.Item 
            content='Przypisane do mnie' 
            active={predicate.has('isGoing')} 
            onClick={() => setPredicate('isGoing', 'true')}
            />
            <Menu.Item 
            content='Założone przeze mnie' 
            active={predicate.has('isHost')} 
            onClick={() => setPredicate('isHost', 'true')}
            />
            <Menu.Item>
                <ActivityFiltersSearch />
            </Menu.Item>
        </Menu>
        <Header/>
        <Calendar 
        onChange={(date: any) => setPredicate('startDate', date as Date)}
        value={predicate.get('startDate') || new Date()}
        />
        </>
    )
})