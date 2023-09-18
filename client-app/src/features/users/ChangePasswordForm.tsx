import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ChangePasswordForm() {
    const {userStore} = useStore();
    return (
        <Formik 
        initialValues={{oldPassword:'', newPassword: '', newPasswordCheck: '', error: null}}
        onSubmit={(values, {setErrors}) => userStore.changePassword(values).catch(error => 
            setErrors({error: error.ErrorMessage}))}    
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content ='Zmień hasło' color = 'teal' textAlign="center"/>
                    <MyTextInput placeholder="Stare Hasło" name='oldPassword' type='password' />
                    <MyTextInput placeholder="Nowe Hasło" name='newPassword' type='password' />
                    <MyTextInput placeholder="Powtórz nowe hasło" name='newPasswordCheck' type='password' />
                    <ErrorMessage name='error' render={() => <Label style={{marginBottom: 10}} basic color='red' content={errors.error}/>}/>
                    <Button loading={isSubmitting} positive content ='Zmień' type="submit" fluid />
                </Form>
            )}
        </Formik>
    )
})