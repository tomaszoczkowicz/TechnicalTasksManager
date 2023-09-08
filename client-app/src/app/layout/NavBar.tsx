import { Button, Container, Menu, Image, Dropdown, Icon} from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";



export default observer(function NavBar(){
    const {userStore: {user, logout}} = useStore();
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <Icon size='big' name='industry' style={{marginRight: '10px'}}/>
                    
                    OknoPlus
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name='Zadania' />
                <Menu.Item as={NavLink} to='/expertise' name='Ekspertyzy'/>
                <Menu.Item as={NavLink} to='/errors' name='Błędy'>Błędy</Menu.Item>
                <Menu.Item>
                     <Button as={NavLink} to='/createActivity' positive content='Dodaj Zadanie'/>
                </Menu.Item>
                <Menu.Item position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right'/>
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} text='Mój profil' icon ='user' />
                            <Dropdown.Item onClick={logout} text='Wyloguj' icon ='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>

        </Menu>
    )
})