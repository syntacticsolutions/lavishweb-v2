import React, {useState, createContext, useEffect} from 'react'
import firebase from 'firebase'

var app = firebase.initializeApp({
    apiKey: "AIzaSyC60p-vCf_3wnMNJIrBlaGLrPm9AzpeHVQ",
    authDomain: "relate.lavishweb.com",
    projectId: "my-project-1567294430480",
    storageBucket: "my-project-1567294430480.appspot.com",
    messagingSenderId: "196573664670",
    appId: "1:196573664670:web:48c93f09ad330fc503b28f",
    measurementId: "G-N12994Z874"
});


const AuthUserContext = createContext(undefined)

function AuthUserProvider ({children}) {
    const [user, setUser] = useState({})

    useEffect(() => {
        firebase
            .auth()
            .onAuthStateChanged((user) => {
                if (user) setUser(user)
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

