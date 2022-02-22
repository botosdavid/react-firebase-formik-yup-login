import { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import Loading from '../components/Loading';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const auth = getAuth();

    const signUp = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = async (email, password) => {   
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if(userCredential) setUser(userCredential.user);
            return true;
        }catch(err) {return false;}
    }

    const signOut = () => {
        auth.signOut();
        setUser(null);
    }

    useEffect( ()=> {
        const unsubscribe = onAuthStateChanged( auth, (user) => {
            if(user) setUser(user);
            setIsInitialized(true);
        })
        return unsubscribe;
    },[])

    if(!isInitialized) return <Loading />
    return (
        <AuthContext.Provider value={{signUp, signIn, user, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

