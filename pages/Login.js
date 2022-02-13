import { Button } from '@mui/material';
import Head from 'next/head';
import styled from "styled-components";
import { auth, provider } from '../firebase';

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    }

  return (
    <Container>
        <Head>
            <title>Login</title>
        </Head>

        <LoginContainer>
            <Logo src='/jax.png'/>
            <ButtonOutline onClick={signIn} variant='outlined'>Sign in with google</ButtonOutline>
        </LoginContainer>
    </Container>
  )
}

export default Login

const Container = styled.div`
    display: grid;
    place-items: center;
    height:100vh;
`

const LoginContainer = styled.div`
    padding: 100px;
    display: flex;
    flex-direction: column;
    background:#fff;
    border-radius: 5px;
    box-shadow: 0 0 10px #111;
`

const Logo = styled.img`
 height: 200px;
 width: 200px;
 background-color: #905050;
 margin-bottom: 20px;
`

const ButtonOutline = styled(Button)`
    &&& {
    color: #905050;
    border-color: #905050;

    :hover { 
        color: #fff;
        background-color: #905050;
        border-color: #905050;
    }
    }
`