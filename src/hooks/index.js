import {useQuery} from '@apollo/react-hooks'
import {GET_BLOG_POSTS_BY_CATEGORY_QUERY} from '../queries/posts'

export default function usePostsByCategoriesHook(cat_ids) {
    return useQuery(GET_BLOG_POSTS_BY_CATEGORY_QUERY, {
        variables: {cat_ids}
    })
}