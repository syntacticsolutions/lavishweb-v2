import React from 'react'

export default function Toggle ({children, type, rounded, onClick, checked}) {
    return (
    <div >
        <label className="toggle-control">
            <input onClick={onClick} type="checkbox" checked={checked}/>
            <span className="control"><i className="fas fa-sun"><i className="fas fa-moon"></i></i></span>
        </label>
    </div>
    )
}