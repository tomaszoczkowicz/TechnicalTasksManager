import React, {  useEffect, useState } from "react";
import { Button, Header,  Segment } from "semantic-ui-react";
import { Activity, ActivityFormValues } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import {v4 as uuid} from "uuid";
import { Formik, Form} from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { priorityOptions } from "../../../app/common/options/priorityOptions";
import { statusOptions } from "../../../app/common/options/statusOptions";

export default observer ( function ActivityForm() {

    const {activityStore} = useStore();
    const{createActivity, updateActivity, 
        loading, loadActivity, loadingInitial, endDateVisible} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity descryption is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        priority: Yup.string().required(),
        status: Yup.string().required()
    })

    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)))
    }, [id, loadActivity]);

    function handleFormSubmit(activity: ActivityFormValues){
        
        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`))
        }else  {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }

    }


    if(loadingInitial) return <LoadingComponent content='Wczytywanie...'/>
    return (
        <Segment clearing>
            <Header content='Szczegóły zadania' sub color='teal'/>
            <Formik 
            validationSchema={validationSchema}
            enableReinitialize 
            initialValues={activity} 
            onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                <MyTextInput name = 'title' placeholder='Title' />
                <MyTextArea rows={3} placeholder='Description'  name='description' />
                <MySelectInput placeholder='Category' name='category' options={categoryOptions}/>
                <MyDateInput
                     placeholderText='Date'  
                     name='date' 
                     timeCaption='time'
                     dateFormat='MMMM d, yyyy h:mm aa'
                     />
                
                <Header content='Status zadania' sub color='teal'/>
                <MySelectInput placeholder='Priorytet'  name='priority' options={priorityOptions}/>
                <MySelectInput placeholder='Status'  name='status' options={statusOptions}/>
                {endDateVisible &&
                    <MyDateInput
                    placeholderText='Date'  
                    name='endDate' 
                    timeCaption='time'
                    dateFormat='MMMM d, yyyy h:mm aa'
                    />      
                }
                <Button 
                    disabled = {isSubmitting || !dirty || !isValid}
                    loading ={isSubmitting} floated='right' 
                    positive type='submit' content='Wyślij' />
                <Button as={Link} to='/activities' floated='right' type='button' content='Anuluj' />
            </Form>
                )}
            </Formik>
            
        </Segment>
    )
})