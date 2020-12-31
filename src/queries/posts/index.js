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
                author
                author_image
                author_id
                created_at
            }
            likes
            categories {
                id
                label
            }
            updated_at
            keyword1
            keyword2
        } 
    }
`;

export const GET_BLOG_POSTS_QUERY = gql`
    query GetBlogPosts($type: String) {
        posts: getPostsByType(type: $type) {
            id
            title
            description
            updated_at
            author
            image
            categories {
                id
                label
            }
        }
    }
`

export const GET_BLOG_POSTS_BY_CATEGORY_QUERY = gql`
    query GetBlogPostsByCategory($cat_ids: [Int]) {
        posts: getPostsByCategories(cat_ids: $cat_ids) {
            id
            title
            description
            updated_at
            author
            image
            categories {
                id
                label
            }
        }
    }
`

export const POST_COMMENT_MUTATION = gql`
    mutation PostCommentMutation ($text: String, $id: ID) {
        response: postComment (text: $text, id: $id)
    }
`