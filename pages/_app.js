import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import Login from './Login';
import Loading from '../components/Loading';
import { collection, doc, getDocs, query, QuerySnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  
  useEffect(() => {
    if (user) {
      const usersRef = collection(db, "users");
      setDoc(doc(usersRef, user.uid), {
        email: user.email,
        photoURL: user.photoURL,
        lastSeen: serverTimestamp()
      }, { merge: true })
        .catch(alert);
    }
  }, [user]);

  if (loading) return <Loading />

  if (!user) return <Login />


  return <Component {...pageProps} />
}

export default MyApp
