import React from 'react';
import MasonryPost from './masonry-post';

export default function PostMasonry ({
    posts,
    columns,
    tagsOnTop,
    onSelect
}) {
    return (
    <section className="masonry" style={{
        gridTemplateColumns: `repeat(${columns}, minmax(300px, 1fr))`
    }}>
        { posts.map((post, index) => 
            <MasonryPost {...{
                post,
                index,
                tagsOnTop,
                key: index,
                onSelect
            }}/>    
        )}
    </section>
    )
}