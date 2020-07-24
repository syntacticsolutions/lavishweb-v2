import gql from 'graphql-tag'

export const LOGIN_MUTATION = gql`
    mutation Login($email: String) {
        login(email: $email)
    }
`

export const SIGNUP_MUTATION = gql`
    mutation Signup($email: String) {
        signup(email: $email)
    }
`