import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search'/>
                Ojej, nie znaleźliśmy, czego szukasz 
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities'>
                    Powrót
                </Button>
            </Segment.Inline>
        </Segment>
    )
}