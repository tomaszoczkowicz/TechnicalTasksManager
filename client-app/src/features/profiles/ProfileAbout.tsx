import { Card, Image, Header,Tab, Grid, Button, Segment } from 'semantic-ui-react';
import { Photo, Profile } from '../../app/models/profile';
import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { useStore } from '../../app/stores/store';
import PhotoUploadWidget from '../../app/common/imageUpload/PhotoUploadWidget';
import { Formik , Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import MyTextArea from '../../app/common/form/MyTextArea';
import LoginForm from '../users/LoginForm';
import ChangePasswordForm from '../users/ChangePasswordForm';

interface Props{
    profile: Profile;
}

export default observer(function ProfileAbout({profile} : Props) {
    const {profileStore: {isCurrentUser, updateProfile}} = useStore();
    const [editBioMode, setEditBioMode] = useState(false);
    const [editPasswordMode, setEditPasswordMode] = useState(false);
    const {modalStore} = useStore();
    const validationSchema = Yup.object({
        displayName: Yup.string().required('The displayName title is required'),
        bio: Yup.string().required('The bio is required'),
    })


    function handleFormSubmit(profile: Profile){
        updateProfile(profile);
        setEditBioMode(!editBioMode);
    }

    return(
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='user plus' content='O mnie'/>
                    {isCurrentUser && (
                        <Button floated='right' basic 
                        content={editBioMode ? 'Anuluj' : 'Edytuj'}
                        onClick={() => setEditBioMode(!editBioMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {editBioMode ? (
                        <Segment clearing>
                        <Formik 
                        validationSchema={validationSchema}
                        enableReinitialize 
                        initialValues={profile} 
                        onSubmit={values => handleFormSubmit(values)}>
                            {({handleSubmit, isValid, isSubmitting, dirty}) => (
                            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <MyTextInput name = 'displayName' placeholder='Title' />
                            <MyTextArea rows={3} placeholder='Description'  name='bio' /> 
                            <Button 
                                disabled = {isSubmitting || !dirty || !isValid}
                                loading ={isSubmitting} floated='right' 
                                positive type='submit' content='Zapisz' />  
                                               
                        </Form>
                            )}
                        </Formik>
                        <Button floated='right' basic 
                        content={editPasswordMode ? 'Anuluj' : 'Zmiana hasła'}
                        onClick={() => modalStore.openModal(<ChangePasswordForm/>)}
                        />
                    </Segment>
                    ) : (
                        <>
                        <p>Strona o {profile.displayName}</p>
                        <p>{profile.bio}</p>
                        </>
                    
                    )}
                </Grid.Column>
            </Grid>
            

        </Tab.Pane>
    )

}
)