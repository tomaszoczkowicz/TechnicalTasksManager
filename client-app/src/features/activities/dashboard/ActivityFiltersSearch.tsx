import { observer } from 'mobx-react-lite'
import {Header} from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';

import { Formik, Form, Field, FieldProps } from 'formik';





export default observer(function ActivityFiltersSearch() {
    const {activityStore: { setPredicate}} = useStore();
    
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