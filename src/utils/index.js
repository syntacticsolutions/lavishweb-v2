import isEmpty from 'lodash/isEmpty'
import { useEffect } from 'react'
import {useAuthUser} from '../context/user-context'

export const usePermsEffect = (perm, cb) => {
    const [user,,loading] = useAuthUser()

    useEffect(() => {
        if (!isEmpty(user) && !loading) {
            console.log({user})
            user.getIdTokenResult(true)
                .catch(err => {
                    cb()
                })
                .then((authUser) => {
                    console.log({authUser})
                    if (!authUser?.claims?.perms?.includes(perm)) {
                        cb()
                        // TODO add toaster messages
                    }
                })
        }
    }, [user]) // eslint-disable-line
}