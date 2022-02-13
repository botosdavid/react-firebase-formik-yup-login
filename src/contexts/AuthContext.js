import { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import'../authentication/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
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
        })
        return unsubscribe;
    },[])

    return (
        <AuthContext.Provider value={{signUp, signIn, user, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

