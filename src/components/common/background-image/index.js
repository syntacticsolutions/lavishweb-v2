import React from 'react';

export default function ({image, children}) {
    return (
        <div
            className="lavish-background-image overlay2"
            style={{backgroundImage: `url(${image})`, width: "100%"}}>
                {children}
        </div>
    )
}