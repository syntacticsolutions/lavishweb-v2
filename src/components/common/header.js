import React from 'react'
import Button from './button'

export default function Header ({title, text, align, children, onClick, btnText}) {
    return (
        <section className={`header justify-${align}`}>
            <h1>{title}</h1>
            {children}
            <p>{text}</p>
            {btnText &&
                <Button
                    onClick={onClick}
                    type="flashy"
                    rounded
                >
                    {btnText}
                </Button>
            }
        </section>
    )
}