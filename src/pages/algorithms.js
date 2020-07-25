import React, {useCallback} from 'react'
import usePostsByCategoriesHook from '../hooks'
import {PostGrid} from '../components/common/post-masonry'
import {BlogMain} from '../components/common/hoc'

const catIds = [8]

export default function Algorithms () {
    let {data, loading, error} = usePostsByCategoriesHook(catIds)

    const goTo = useCallback(() => {

    }, [])

    return (
        <BlogMain>
            <section className="container">
                <div className="row">
                    <h1>Algorithms</h1>
                    {data?.posts && (
                        <PostGrid
                            onSelect={goTo}
                            posts={data?.posts}
                        />
                    )}
                </div>
            </section>
        </BlogMain>
    )
}