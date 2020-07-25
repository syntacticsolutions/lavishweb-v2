import gql from 'graphql-tag'

export const SAVE_POST_MUTATION = gql`
    mutation SavePost($id: ID, $data: PostInput) {
        savePost(id: $id, data: $data)
    }
`

export const PUBLISH_POST_MUTATION = gql`
    mutation PublishPost($id: ID) {
        publishPost(id: $id)
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

export const GET_POST_QUERY = gql`
    query GetPost($id: ID) {
        post: getPost (id: $id) {
            author
            author_id
            title
            description
            text
            bg_type
            bg_src
            comments {
                id
                comment
            }
            likes
            categories
            updated_at
            keyword1
            keyword2
        } 
    }
`;