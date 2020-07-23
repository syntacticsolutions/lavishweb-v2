import gql from 'graphql-tag'

export const SAVE_POST_MUTATION = gql`
    mutation SavePost($id: String, $data: PostInput) {
        savePost(id: $id, data: $data)
    }
`

export const PUBLISH_POST_MUTATION = gql`
    mutation PublishPost($id: String, $data: PostInput) {
        publishPost(id: $id, data: $data)
    }
`

export const GET_CATEGORIES_QUERY = gql`
    query GetCategories {
        categories: getCategories {
            label
            id
        }
    }
`