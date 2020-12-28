import isEmpty from 'lodash/isEmpty'
import { useEffect } from 'react'

export const usePermsEffect = (perm, user, cb) => {
    useEffect(() => {
        if (!isEmpty(user)) {
            user.getIdTokenResult(true)
                .catch(err => {
                    cb()
                })
                .then((user) => {
                    if (!user?.claims?.perms?.includes(perm)) {
                        cb()
    
                        // TODO add toaster messages
                    }
                })
        }
    }, [cb, perm, user])
}