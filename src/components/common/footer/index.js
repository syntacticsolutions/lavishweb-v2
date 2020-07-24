import React from 'react'

export default function Footer ({pages, history}) {
    return (
        <footer className="lavish-footer">
            <ul>
                {Array.isArray(pages) && pages.map(page => (
                    <li>
                        <a href={page.url} >
                            - {page.title}
                        </a>
                    </li>
                ))}
            </ul>
            <p>Copyright © 2020 Lavish Web Creations LLC. All rights reserved.</p>
        </footer>
    )
}