import React, {useState, createContext, useEffect} from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseKey from './key'

firebase.initializeApp({
    apiKey: firebaseKey,
    authDomain: "backend.lavishweb.com",
    projectId: "lavishweb-94938",
    storageBucket: "lavishweb-94938.appspot.com",
    messagingSenderId: "1061245448867",
    appId: "1:1061245448867:web:1cc95715f77acb3c43c516"
});

const AuthUserContext = createContext(undefined)

function AuthUserProvider ({children}) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        firebase
            .auth()
            .onAuthStateChanged((authUser) => {
                setLoading(false)
                if (authUser) {
                    setUser(authUser)
                    authUser.getIdTokenResult(true).then(function ({token}) {
                        localStorage.setItem('token', `Bearer ${token}`)
                    })
                }
            })
    }, [user])
    
    return (
        <AuthUserContext.Provider value={[user, setUser, loading]}>
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

