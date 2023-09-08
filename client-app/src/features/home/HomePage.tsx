import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button, Icon} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";


export default observer(function HomePage(){
    const {userStore, modalStore} = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    
                <Icon size='large' name='industry' style={{marginBottom: 12}}/>
                    Zadania Oknoplus!
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                    <Header as='h2' inverted content ='Witamy w zadaniach, zapraszamy'/>
                    <Button as={Link} to='/activities' size='huge' inverted>Wchodzę</Button>
                    </>
                ) : (
                    <>
                    <Button onClick={() => modalStore.openModal(<LoginForm/>)} size='huge' inverted>Login!</Button>
                    <Button onClick={() => modalStore.openModal(<RegisterForm/>)}  size='huge' inverted>Rejestracja</Button>
                    </>
                    
                )}
                
                
            </Container>
        </Segment>
    )
})