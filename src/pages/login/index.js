import React, {useState, useCallback} from 'react'
import {Input, Tabs, Form} from 'antd'
import {useMutation} from '@apollo/react-hooks'
import firebase from 'firebase/app'
import 'firebase/auth'
import {message} from 'antd'

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
                message.error(err.message)
            })
        
        if (user) {
            history.push('/blog');
        }
    }, [data, activeKey, login, signup, history])

    const email = (
        <Form.Item
            label="Email"
            name="email"
            rules={[
                {
                  type: 'email',
                  message: 'Please provide a valid email',
                },
                {
                  required: true,
                  message: 'Email is required',
                },
            ]}
        >
            <Input type="email" onChange={setModel('email')}/>
        </Form.Item>
    )

    const password = (
        <Form.Item
            label="Password"
            name="password"
            rules={[
            {
                required: true,
                message: 'Please enter a password!',
            },
            ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || value.length > 7) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Password must be at least 8 characters long.');
                },
              }),
            ]}
        >
            <Input type="password" onChange={setModel('password')}/>
        </Form.Item>
    )

    const confirmPwd = (
        <Form.Item
            label="Confirm Password"
            name="confirm-password"
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Passwords must match!');
                },
              }),
            ]}
        >
            <Input type="password" onChange={setModel('repeatedPass')}/>
        </Form.Item>
    )

    const forgotPwd = (
        <>
            <p
                className="text-primary
                forgot-pwd"
                onClick={() => setActiveKey('3')}
            >
                Forgot your password?
            </p>
        </>
    )

    const submit = (
        <Button type="flashy" htmlType="submit" onClick={onSubmit}>
            { activeKey === '1' 
                ? 'Login'
                : activeKey === '2'
                ? 'Sign up'
                : 'Request Password Reset'}
        </Button>
    )

    return (
        <section className="signin-container">
            <Form
                name="basic"
                initialValues={{
                    remember: true,
                }}
                layout="vertical"
            >  
                <div className="form-container">      
                    <Tabs activeKey={activeKey} onChange={setActiveKey}>
                        <TabPane tab="Login" key="1">
                            {email}
                            {password}
                            {forgotPwd}
                            {submit}
                        </TabPane>
                        <TabPane tab="Signup" key="2">
                            {email}
                            {password}
                            {confirmPwd}
                            {submit}
                        </TabPane>
                    </Tabs>
                        {
                            activeKey === '3' && email
                        }
                        {
                            activeKey === '3' && (
                                <Button type="flashy" htmlType="submit" onClick={onSubmit}>
                                    Request Password Reset
                                </Button>
                            )
                        }
                </div>
            </Form>
        </section>
    )
}