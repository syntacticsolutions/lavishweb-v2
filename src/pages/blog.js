import React, {useMemo, useCallback} from 'react'
import {useQuery} from '@apollo/react-hooks';
import {BlogMain} from '../components/common/hoc'

import {GET_BLOG_POSTS_QUERY} from '../queries/posts'
import {PostMasonry, MasonryPost, PostGrid} from '../components/common/post-masonry'

const trendingConfig = {
    1: {
        gridArea: '1 / 2 / 3 / 3',
        height: '600px',
    }
}

const featuredConfig = {
    0: {
        gridArea: '1 / 1 / 2 / 3',
        height: '300px'
    },
    1: {
        height: '300px'
    },
    3: {
        height: '630px',
        marginLeft: '30px',
        width: '550px   '
    }
}

const mergeStyles = function (posts, config){
    if (!posts) return [];
    return posts.map((post, index) => {
        post.style = config[index]
        return post
    })
}

const options = (type) => ({
    variables: {
        type
    }
})

export default function Blog ({history}) {
    const {data: trendingData} = useQuery(GET_BLOG_POSTS_QUERY, options('trending'))
    const {data: featuredData} = useQuery(GET_BLOG_POSTS_QUERY, options('featured'))
    const {data: homeData} = useQuery(GET_BLOG_POSTS_QUERY, options('default'))

    const trending = useMemo(() => mergeStyles(trendingData?.posts, trendingConfig), [trendingData])
    const featured = useMemo(() => mergeStyles(featuredData?.posts, featuredConfig), [featuredData])
    const lastPost = useMemo(() => featured?.pop(), [featured])

    const goTo = useCallback((obj) => {
        window.location.href = `/view-post/${obj.id}`
    }, [])

    return (
        <BlogMain>
            <div className="row">
                <h1>Blog</h1>
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
                <div className="row trending-posts-container">
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
        </BlogMain>
    )}