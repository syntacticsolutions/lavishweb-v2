import gql from 'graphql-tag'

export const LOGIN_MUTATION = gql`
    mutation Login {
        login
    }
`

export const SIGNUP_MUTATION = gql`
    mutation Signup {
        signup
    }
`

export const LIST_USER_QUERY = gql`
    query ListUsers {
        users: listUsers {
            id
            first_name
            last_name
            email
            image
            role
        }
    }
`