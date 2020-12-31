import React from 'react'
import {categoryColors} from './styles'

export default function TagRow ({tags}) {
    return (
        <div className="tags-container">
            {tags.map(({label}, ind) => 
                <span key={ind} className="tag" style={{backgroundColor: categoryColors[label]}}>
                    {label.toUpperCase()}
                </span>
            )}
        </div>
    )
}