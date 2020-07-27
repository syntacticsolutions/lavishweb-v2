import React, {useRef, useState, useEffect, useCallback} from 'react'
import {useQuery} from '@apollo/react-hooks'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import {Input} from 'antd'

import Comment from '../components/common/comment'
import Button from '../components/common/button'
import {GET_POST_QUERY} from '../queries/posts'

const {TextArea} = Input;
const options = {
    placeholder: 'Begin typing your post...',
    theme: 'snow'
};

export default function PostViewer ({match, history}) {
    const {
        params: {id, slug}
    } = match

    const quillEditor = useRef(null)
    const [editorEl, setEditorEl] = useState(null)
    const [commentTxt, setCommentTxt] = useState('')

    useEffect(() => {
        setEditorEl(new Quill(quillEditor.current, options))
    }, [])

    const {
        data,
    } = useQuery(GET_POST_QUERY, {
        variables: {id},
        onCompleted: ({post}) => {
            if (!slug) {
                // for SEO 
                history.replace(
                    `/view-post/${id}/${
                        post.title
                            .toLowerCase()
                            .split(' ')
                            .join('_')
                    }`
                )
            }
            if (post.text) {
                editorEl.setContents(JSON.parse(post.text))
            }
        }
    })

    const postComment = useCallback(() => {
        console.log(commentTxt)
    }, [commentTxt])

    return (
        <article className="post-viewer-container">

            <div className="post-title-container">
                <h1>{data?.post?.title}</h1>
                <p className="flex flex-column">
                    <span>
                        {
                            data?.post?.author && 
                                `Author: ${data?.post?.author}`
                        }
                    </span>
                    <span>Last Updated: 
                        { 
                            data?.post?.updated_at &&
                                new Date(parseInt(data?.post?.updated_at))
                                    .toLocaleDateString()
                        }
                    </span>
                </p>
            </div>
            <section className="post-intro-container">
                {
                    data?.post?.bg_type === '2' ?
                        <section className="iframe-container" >
                            {data?.post?.bg_src &&
                                <iframe
                                    title="background-image"
                                    src={data?.post?.bg_src}
                                    frameborder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                />
                            }
                        </section>
                    :
                    (
                        <figure>
                            <img src={
                                data?.post?.bg_src ||
                                    `https://cdn5.vectorstock.com/i/thumb-large/99/94/default-avatar-placeholder-profile-icon-male-vector-23889994.jpg`}
                                alt="post-background"
                            />
                        </figure>
                    )
                }
            </section>
            <section className="post-content-container">
                <h1>{data?.post?.title}</h1>
                <div ref={quillEditor} />
            </section>
            <section className="post-comments-container">
                <h3>{data?.post?.comments?.length} Comments</h3>
                { 
                    Boolean(data?.post?.comments?.length) &&
                        data.post.comments.map((comment, key)=> (
                            <Comment {...{comment, key}} />
                        ))
                }
                <h4>Leave a comment</h4>
                <div className="post-comments-inputs">
                    <TextArea
                        value={commentTxt}
                        placeholder="Leave a comment..."
                        rows={4}
                        onChange={({target}) => setCommentTxt(target.value)}
                    />
                    <Button type="secondary" onClick={postComment}>Send</Button>
                </div>
            </section>
        </article>
    )
}
