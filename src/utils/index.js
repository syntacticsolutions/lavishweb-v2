import isEmpty from 'lodash/isEmpty'
import { useEffect, useState } from 'react'

export const usePermsEffect = (perm, user, cb) => {
    const [loggedInUser, setLoggedInUser] = useState(user)

    useEffect(() => {
        if (user !== loggedInUser) {
            setLoggedInUser(user)
        }
        if (!isEmpty(loggedInUser)) {
            loggedInUser.getIdTokenResult(true)
                .catch(err => {
                    cb()
                })
                .then((authUser) => {
                    if (!authUser?.claims?.perms?.includes(perm)) {
                        cb()
    
                        // TODO add toaster messages
                    }
                })
        }
    }, [loggedInUser]) // eslint-disable-line
}