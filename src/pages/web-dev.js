import React, {useCallback} from 'react'
import usePostsByCategoriesHook from '../hooks'
import {PostGrid} from '../components/common/post-masonry'
import {BlogMain} from '../components/common/hoc'

const catIds = [1,2,3,4,5,9]

export default function WebDev () {
    let {data, loading, error} = usePostsByCategoriesHook(catIds)

    const goTo = useCallback(() => {

    }, [])

    return (
        <BlogMain>
            <section className="container">
                <div className="row">
                    <h1>Web Dev</h1>
                    { 
                        data?.posts && (
                            <PostGrid
                                onSelect={goTo}
                                posts={data?.posts}
                            />)
                    }
                </div>
            </section>
        </BlogMain>
    )
}