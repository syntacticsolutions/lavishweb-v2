import gql from 'graphql-tag'

export const LIST_IMAGES_QUERY = gql`
    query ListBlogImages {
        listImages {
            url
        }
    }
`;