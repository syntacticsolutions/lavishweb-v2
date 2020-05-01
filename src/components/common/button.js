import React from 'react'

export default function Button ({children, type, rounded, onClick}) {
    return (
        <button
            className={`lavish-btn ${rounded && 'rounded'} ${type}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}