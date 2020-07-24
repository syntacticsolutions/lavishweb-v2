import React, {useState, createContext, useEffect} from 'react'
import firebase from 'firebase'

var app = firebase.initializeApp({
    apiKey: "AIzaSyCxXQkfPukVNIJi9f8Nip39CMgAE6LlBF4",
    authDomain: "backend.lavishweb.com",
    projectId: "lavishweb-94938",
    storageBucket: "lavishweb-94938.appspot.com",
    messagingSenderId: "1061245448867",
    appId: "1:1061245448867:web:1cc95715f77acb3c43c516"
});

const AuthUserContext = createContext(undefined)

function AuthUserProvider ({children}) {
    const [user, setUser] = useState({})

    useEffect(() => {
        firebase
            .auth()
            .onAuthStateChanged((user) => {
                if (user) setUser(user)
                user.getIdToken().then(function (accessToken) {
                    localStorage.setItem('token', `Bearer ${accessToken}`)
                    // TODO get Perms
                })
            })
    }, [])
    
    return (
        <AuthUserContext.Provider value={[user, setUser]}>
            {children}
        </AuthUserContext.Provider>
    )
}

function useAuthUser() {
    const context = React.useContext(AuthUserContext);

    if (context === undefined) {
        throw new Error('useAuthUser must be used within a AuthUserProvider')
    }
    
    return context
}

function withAuthUser (Component) {
    return (
        <AuthUserProvider>
            {Component}
        </AuthUserProvider>
    )
}

export {useAuthUser, withAuthUser, AuthUserProvider}

