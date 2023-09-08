import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import {Segment, Header, Comment, Button, Loader} from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import { formatDistanceToNow } from 'date-fns';
import { pl } from 'date-fns/locale';




export default observer(function ActivityFiltersSearch() {
    const {activityStore: {predicate, setPredicate}} = useStore();
    
    return (
        <>
            <Header content='Szukaj' sub color='teal'/>

            <Formik
                    onSubmit={(values) => 
                        {
                        setPredicate('search', values.body)
                        }}
                    initialValues={{body: ''}}                      
                    >
                        {({ handleSubmit})=> (
                            <Form className='ui form'>
                                <Field name='body'>
                                    {(props: FieldProps) => (
                                        <div style={{position: 'relative'}}>
                                            
                                            <input
                                                placeholder='Wpisz fragment (Enter żeby szukać)'
                                                {...props.field}
                                                onKeyDown={e=>{ 
                                                    if (e.key === 'Enter') {
                                                        
                                                        handleSubmit()
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}
                                </Field>
                            </Form>
                        )}
                    </Formik>

        </>

    )
})