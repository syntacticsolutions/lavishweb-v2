import React, {useRef, useState, useEffect, useCallback} from 'react'
import {useQuery, useMutation} from '@apollo/react-hooks'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import {Input} from 'antd'

import Comment from '../components/common/comment'
import Button from '../components/common/button'
import {GET_POST_QUERY, POST_COMMENT_MUTATION} from '../queries/posts'

import Helmet from 'react-helmet'

const {TextArea} = Input;
const options = {
    placeholder: 'Begin typing your post...',
    theme: 'snow'
};

export default function PostViewer ({match, history}) {
    const {
        params: {id}
    } = match

    const quillEditor = useRef(null)
    const [editorEl, setEditorEl] = useState(null)
    const [commentTxt, setCommentTxt] = useState('')

    useEffect(() => {
        setEditorEl(new Quill(quillEditor.current, options))
    }, [])

    const [createComment] = useMutation(POST_COMMENT_MUTATION, {
        variables: {id, text: commentTxt}
    })

    const {
        data,
        refetch
    } = useQuery(GET_POST_QUERY, {
        variables: {id},
        onCompleted: ({post}) => {
            if (post.text) {
                const delta = JSON.parse(post.text)
                editorEl.setContents(delta)
            }
        }
    })

    const postComment = useCallback(() => {
        createComment()
            .catch(err => {
                console.log(err.message)
                if (err.message.includes('Forbidden')) {
                    history.push('/login')
                    // TODO add toasters
                }
                // TODO add toasters
            })
    }, [createComment, history])

    return (
        <article className="post-viewer-container">
            <Helmet>
                <title>{data?.post?.title}</title>
                <meta property="og:image" content={data?.post?.image} />
                <meta property="og:title" content={data?.post?.title} />
                <meta property="og:url" content={match.url} />
                <meta property="og:type" content="article" />
                <meta name="description" content={data?.post?.description} />
            </Helmet>
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
            <div className="post-title-container">
                <div className="title-wrapper">
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
            </div>
            <section className="post-content-container">
                <div ref={quillEditor} />
            </section>
            <section className="post-comments-container">
                <h4>Leave a comment</h4>
                <div className="post-comments-inputs">
                    <TextArea
                        value={commentTxt}
                        placeholder="Leave a comment..."
                        rows={4}
                        onChange={({target}) => setCommentTxt(target.value)}
                    />
                    <Button
                        type="secondary"
                        onClick={async () => {
                            await postComment()
                            refetch()
                        }}>
                            Send
                    </Button>
                </div>
                <h3>{data?.post?.comments?.length} Comments</h3>
                <div className="comments-wrapper">
                    { 
                        Boolean(data?.post?.comments?.length) &&
                            data.post.comments.map((comment, key)=> (
                                <Comment {...{comment, key}} />
                            ))
                    }
                </div>
            </section>
        </article>
    )
}
