import styled from 'styled-components';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import * as EmailValidator from 'email-validator';
import { auth, db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from './Chat';
import { useAuthState } from 'react-firebase-hooks/auth';

function Sidebar() {
    const [user] = useAuthState(auth);
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
    const [snapshot] = useCollection(userChatRef);

    const createChat = () => {
        const input = prompt('Please enter the email address of the user you wish to connect');
        if (!input) return null;

        if (EmailValidator.validate(input) && !chatAlredyExists(input) && input !== user.email) {
            db.collection('chats').add({
                users: [user.email, input]
            })
        }

    };

    const chatAlredyExists = (recipientEmail) => 
        !!snapshot?.docs.find(
            (chat) => 
                chat.data().users.find((user) => user === recipientEmail)?.length > 0
            );

    return (
        <Container>
            <Header>
                <UserAvatar src={user?.photoURL} onClick={() => auth.signOut()} />

                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>

            </Header>

            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in chats" />
            </Search>

            <SidebarButton onClick={createChat}>
                Start a new chat
            </SidebarButton>

            
            {snapshot?.docs.map(function(chat) {
                return (<Chat key={chat.id} id={chat.id} users={chat.data().users}/>)
            }
            )}
            
        </Container>
    )
}

export default Sidebar;

const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid azure;
    overflow-y: scroll;
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    
    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const SidebarButton = styled(Button)`
    width:100%;
    &&& {
    color: #905050;
    border-top: 1px solid #905050;
    border-bottom: 1px solid #905050;
    }

`

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`

const SearchInput = styled.input`
    outline: none;
    border: none;
    flex: 1;

    :focus {
        border-bottom: 2px solid #905050;
    }
`

const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color:azure;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover { 
        opacity: 0.8;
    }
`;

const IconsContainer = styled.div``;