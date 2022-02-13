import { Avatar, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components"
import { auth, db } from "../firebase";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { addDoc, collection, doc, getDocs, orderBy, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { useRef, useState } from "react";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Message from "./Message";
import MicIcon from '@mui/icons-material/Mic';
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";

function ChatScreen({chat, messages}) {
    const [user] = useAuthState(auth);
    const [input, setInput] = useState('')
    const router = useRouter();
    const endOfMessageRef = useRef(null);
    const chatRef = doc(collection(db, 'chats'), router.query.id)
    const [messageSnapshot, setmessageSnapshot] = useState(null)
    const [recipientSnapshot, setrecipientSnapshot] = useState(null)
    getDocs(query(collection(chatRef, 'messages'), orderBy('timestamp', 'asc')))
        .then(docs => setmessageSnapshot(docs));

    getDocs(query(collection(db, 'users'), where('email', '==', getRecipientEmail(chat.users, user))))
        .then(docs => setrecipientSnapshot(docs))

    const recipient = recipientSnapshot?.docs?.[0]?.data();


    const showMessages = () => {
        if (messageSnapshot) {
            return messageSnapshot?.docs.map(message => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                />
            ))
        } else {
            return JSON.parse(messages).map(message => (
                <Message
                    key={message.id}
                    user={message.user}
                    message={message}
                />
            ))
        }
    }

    const sendMessage = (e) => {
        e.preventDefault();
        const usersRef = doc(collection(db, 'users'), user.uid)
        setDoc(usersRef, {
            lastSeen: serverTimestamp()
        }, { merge: true})

        addDoc(collection(chatRef, 'messages'), {
            timestamp: serverTimestamp(),
            message : input,
            user: user.email,
            photoURL: user.photoURL
        })

        setInput('');
        scrollToBottom();
    }

    const scrollToBottom = () => {
        endOfMessageRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    const recipientEmail = getRecipientEmail(chat.users, user);
  return (
    <Container>
        <Header>
            {
                recipient? (
                    <Avatar src={recipient?.photoURL}/>
                ) : (
                    <Avatar>{recipientEmail[0]}</Avatar>
                )
            }

            <HeaderInformation>
                <h3>{recipientEmail}</h3>
                {recipientSnapshot ? 
                (
                    <p>
                        Last Active: {' '}
                    {
                    recipient?.lastSeen?.toDate() ? (
                        <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>
                    ) : 'Unavailable'
                    }
                    </p>
                ) : (
                    <p>Loading Last Active</p>
                )
                }
            </HeaderInformation>
            <HeaderIcons>
                <IconButton>
                    <AttachFileIcon/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </HeaderIcons>
        </Header>

        <MessageContainer>
            {showMessages()}
            <EndOfMessage ref={endOfMessageRef}/>
        </MessageContainer>

        <InputContainer>
            <InsertEmoticonIcon/>
            <Input placeholder='type your message here..' value={input} onChange={e => setInput(e.target.value)}/>
            <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send Message</button>
            <MicIcon/>
        </InputContainer>
    </Container>
  )
}

export default ChatScreen

const Container = styled.div`
`


const Input = styled.input`
    flex: 1;
    outline: 0;
    border: none;
    border-radius: 10px;
    background-color: rgba(144, 80, 80, 0.1);
    padding: 20px;
    margin-left: 15px;
    margin-right: 15px;
`
const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color: white;
    z-index: 100;
`

const Header = styled.div`
    position: sticky;
    background-color: #fff;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    align-items: center;
    height: 80px;
    border-bottom: 1px solid #905050;
`

const HeaderInformation = styled.div`
    margin-left: 15px;
    flex: 1;

    > h3 {
        margin-bottom: 3px;
    }

    > p {
        font-size: 14px;
        color: gray;
    }
`

const HeaderIcons = styled.div``

const MessageContainer = styled.div`
    padding: 30px;
    background-color:#905050;
    min-height: 90vh;
`

const EndOfMessage = styled.div`
    margin-bottom: 50px;
`