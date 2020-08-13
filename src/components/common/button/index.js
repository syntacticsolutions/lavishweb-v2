import React from 'react'

export default function Button ({children, type, rounded, onClick, hoverClass, htmlType}) {

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
            type={htmlType}
        >
            {children}
        </button>
    )
}