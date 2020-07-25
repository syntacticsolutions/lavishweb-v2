import React from 'react'

export const  withLabel = (component, label) => (
    <div className="input-container">
        <label>{label}</label>
        { component }
    </div>
)

export const BlogMain = ({children}) => {
    return (
        <main className="home">
            <section className="container">
                {children}
            </section>
        </main>
    )
}