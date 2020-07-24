import React, {useMemo, useCallback} from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {PostMasonry, MasonryPost, PostGrid} from '../components/common/post-masonry'

const trendingConfig = {
    1: {
        gridArea: '1 / 2 / 3 / 3',
        height: '650px',
        width: '400px'
    }
}

const featuredConfig = {
    0: {
        gridArea: '1 / 1 / 2 / 3',
        height: '400px'
    },
    1: {
        height: '400px'
    },
    3: {
        height: '830px',
        marginLeft: '30px',
        width: '500px   '
    }
}

const mergeStyles = function (posts, config){
    if (!posts) return [];
    return posts.map((post, index) => {
        post.style = config[index]
        return post
    })
}

const GET_BLOG_POSTS_QUERY = gql`
    query GetBlogPosts($type: String) {
        posts: getPostsByType(type: $type) {
            id
            title
            description
            updated_at
            author
            image
            categories
        }
    }
`

const options = (type) => ({
    variables: {
        type
    }
})

export default function Blog () {
    const {data: trendingData, error, loading} = useQuery(GET_BLOG_POSTS_QUERY, options('trending'))
    const {data: featuredData} = useQuery(GET_BLOG_POSTS_QUERY, options('featured'))
    const {data: homeData} = useQuery(GET_BLOG_POSTS_QUERY, options('default'))

    const trending = useMemo(() => mergeStyles(trendingData?.posts, trendingConfig), [trendingData])
    const featured = useMemo(() => mergeStyles(featuredData?.posts, featuredConfig), [featuredData])
    const lastPost = useMemo(() => featured?.pop(), [featured])

    const goTo = useCallback(() => {

    }, [])
    

    return (
        <main className="home">
            <section className="container">
                <div className="row">
                    {featured && (
                        <section className="featured-posts-container">
                            <PostMasonry 
                                onSelect={goTo} 
                                posts={featured} 
                                columns={2} 
                                tagsOnTop={true}
                            />
                            <MasonryPost 
                                onSelect={goTo} 
                                post={lastPost} 
                                tagsOnTop={true} 
                            />
                        </section>
                    )}
                </div>
                <section className="container">
                    <div className="row">
                        <h1>Recent Posts</h1>
                        { 
                            homeData?.posts && (
                                <PostGrid
                                    onSelect={goTo}
                                    posts={homeData.posts}
                                />)
                        }
                    </div>
                </section>
                
                <section className="container">
                    <div className="row">
                    { 
                        trending && (
                            <PostMasonry 
                                onSelect={goTo}
                                posts={trending}
                                columns={3}/>
                        )
                    }
                    </div>
                </section>
            </section>
        </main>
    )}