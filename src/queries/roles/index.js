import gql from 'graphql-tag'

export const LIST_ROLES_QUERY = gql`
    query ListRoles {
        roles: listRoles {
            id
            title
            permissions
        }
    }
`