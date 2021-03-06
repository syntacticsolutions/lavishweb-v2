import React from 'react'
import {TagRow} from './'

export default function MasonryPost ({post, tagsOnTop, onSelect}) {
    const windowWidth = window.innerWidth
    let imageBackground
    try {
        imageBackground = {backgroundImage: `url("${require(`../../../assets/images/${post?.image}`)}")`};
    } catch(err) {
        console.log(err)
        return 'Image Not Found'
    }

    const style = windowWidth > 900 ? {...imageBackground, ...post.style} : imageBackground

    return (
        <a className="masonry-post overlay" style={style} href={`/view-post/${post.id}/${post.title.toLowerCase().split(' ').join('_')}`}>
            <div className="image-text" style={{justifyContent: tagsOnTop ? 'space-between' : 'flex-end'}}>
                <TagRow tags={post.categories} />
                <div>
                    <h2 className="image-title">{post.title}</h2>
                    <span className="image-date">{post.date}</span>
                </div>
            </div>
        </a>
    )
}