import React from 'react'
import moment from 'moment'

import Button from '../button'

export default function Comment ({comment}) {

    return (
        <div className="comment-container">
            <div className="comment-author">
                <figure>
                    <img
                        width="50px"
                        src={comment.author_image || `https://cdn5.vectorstock.com/i/thumb-large/99/94/default-avatar-placeholder-profile-icon-male-vector-23889994.jpg`}
                        alt={comment
                                .author
                                .split(' ')
                                .join('_')
                                .toLowerCase()
                        } />
                </figure>
                <div className="comment-author-meta">
                    <h5>{comment.author}</h5>
                    <h6>{
                        moment(
                            new Date(
                                parseInt(comment?.created_at)
                            ).toLocaleDateString()
                        ).fromNow()
                    }</h6>
                </div>
            </div>
            <p>
                {comment.comment}
            </p>
            <Button hoverClass="primary">REPLY</Button>
        </div>
    )
}