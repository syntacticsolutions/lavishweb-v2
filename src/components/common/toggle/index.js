import React from 'react'

export default function Toggle ({children, type, rounded, onClick, checked}) {
    return (
    <div >
        <label class="toggle-control">
            <input onClick={onClick} type="checkbox" checked={checked}/>
            <span class="control"><i class="fas fa-sun"><i class="fas fa-moon"></i></i></span>
        </label>
    </div>
    )
}