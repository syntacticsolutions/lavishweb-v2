import React, {useState, useEffect} from 'react'
import firebase from 'firebase/app'

export default function Footer ({pages, history}) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        firebase
            .auth()
            .onAuthStateChanged((authUser) => {
                if (authUser) {
                    setUser(authUser)
                    authUser.getIdTokenResult(true).then(function ({token}) {
                        localStorage.setItem('token', `Bearer ${token}`)
                    })
                }
            })
    }, [user])

    return (
        <footer className="lavish-footer">
            <ul>
                {Array.isArray(pages) && pages.map((page, index) => (
                    <li key={index}>
                        <a href={page.url} >
                            - {page.title}
                        </a>
                    </li>
                ))}
                {
                    <li>
                        <a href={'/user-admin'} >
                            - {'Admin Page'}
                        </a>
                    </li>
                }
            </ul>
            <p>Copyright © 2020 Lavish Web Creations LLC. All rights reserved.</p>
        </footer>
    )
}