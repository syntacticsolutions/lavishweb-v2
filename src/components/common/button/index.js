import React from 'react'

export default function Button ({children, type, rounded, onClick, hoverClass}) {


    return (
        <button
            className={`lavish-btn ${
                    rounded && 'rounded'
                } ${
                    type
                }`
            }
            onMouseEnter={
                ({target}) =>
                    target.classList.add(hoverClass)
            }
            onMouseLeave={
                ({target}) =>
                    target.classList.remove(hoverClass)
            }
            onClick={onClick}
        >
            {children}
        </button>
    )
}