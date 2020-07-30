import gql from 'graphql-tag'

export const LIST_IMAGES_QUERY = gql`
    query ListBlogImages {
        listImages {
            url
        }
    }
`;

export const UPLOAD_IMAGE_MUTATION = gql`
    mutation UploadImage($image: String) {
        uploadImage(image: $image)
    }
`