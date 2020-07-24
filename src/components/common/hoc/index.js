import React from 'react'

export const  withLabel = (component, label) => (
    <div className="input-container">
        <label>{label}</label>
        { component }
    </div>
)