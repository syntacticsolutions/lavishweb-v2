import React, {useCallback} from 'react'
import usePostsByCategoriesHook from '../hooks'
import {PostGrid} from '../components/common/post-masonry'
import {BlogMain} from '../components/common/hoc'

const catIds = [8]

export default function Algorithms ({history}) {
    let {data} = usePostsByCategoriesHook(catIds)

    const goTo = useCallback((obj) => {
        history.push(`/view-post/${obj.id}`)
    }, [history])

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