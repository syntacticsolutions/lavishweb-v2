import React, {useState, useCallback} from 'react'
import {Input, Tabs} from 'antd'
import {useMutation} from '@apollo/react-hooks'
import firebase from 'firebase/app'
import 'firebase/auth'

import {withLabel} from '../../components/common/hoc'
import Button from '../../components/common/button'

import {LOGIN_MUTATION, SIGNUP_MUTATION} from '../../queries/user'

const {TabPane} = Tabs

export default function Login ({history}) {
    const [activeKey, setActiveKey] = useState('1')
    const [data, setData] = useState({
        email: '',
        password: '',
        repeatedPass: ''
    })

    const [login] = useMutation(LOGIN_MUTATION)
    const [signup] = useMutation(SIGNUP_MUTATION)

    const setModel = useCallback((key) => ({target}) => {
        setData({
            ...data,
            [key]: target.value
        })
    }, [data])

    const onSubmit = useCallback(async () => {

        let auth = firebase.auth

        let action = {
            '1': async () => {
                let user = await auth()
                    .signInWithEmailAndPassword(data.email, data.password)

                await login()

                await firebase.auth().currentUser.getIdToken(true)
                
                console.log(firebase.auth().currentUser)
                return user
            },
            '2': async () => {
                let user = await auth()
                    .createUserWithEmailAndPassword(data.email, data.password)

                await signup()

                await firebase.auth().currentUser.getIdToken(true)

                return user
            },
            '3': async () => await auth.sendPasswordResetEmail(data.email)
        }[activeKey]

        let user = await action()
            .catch(err => {
                //TODO add toaster messages
                console.error(err)
            })
        
        if (user) {
            history.push('/blog');
        }
    }, [data, activeKey, login, signup, history]) 

    return (
        <section className="signin-container">
            <div className="form-container">            
                <Tabs activeKey={activeKey} onChange={setActiveKey}>
                    <TabPane tab="Login" key="1">
                        {withLabel(<Input type="text" onChange={setModel('email')}/>, 'Email')}
                        {withLabel(<Input type="password" onChange={setModel('password')}/>, 'Password')}
                    </TabPane>
                    <TabPane tab="Signup" key="2">
                        {withLabel(<Input type="text" onChange={setModel('email')}/>, 'Email')}
                        {withLabel(<Input type="password" onChange={setModel('password')}/>, 'Password')}
                        {withLabel(<Input type="password" onChange={setModel('repeatedPass')}/>, 'Confirm Password')}
                    </TabPane>
                    {
                        activeKey === '3' && withLabel(<Input type="text" onChange={setModel('email')} />, 'Email')
                    }
                </Tabs>
                <p
                    class="text-primary
                    forgot-pwd"
                    onClick={() => setActiveKey('3')}
                >
                    Forgot your password?
                </p>
                <Button type="flashy" onClick={onSubmit}>
                    { activeKey === '1' 
                        ? 'Login'
                        : activeKey === '2'
                        ? 'Sign up'
                        : 'Request Password Reset'}
                </Button>
            </div>
        </section>
    )
}