import React, {useRef, useCallback} from 'react';
import Button from '../button'
import Animated from '../animated'

export default function DualImageLink ({images, texts}) {
    const container = useRef(null)

    const onClick = useCallback((path) => () => {
        window.location.href = path
    }, [])

    return (
        <section className="dual-image-link" ref={container}>
            {images.map((image, index) => (
                <div key={index} className="dual-link-image overlay2" style={{backgroundImage: `url(${image})`}} >
                    <Animated type="fadeInUp" targetRef={container}>
                        <h2>{texts[index].title}</h2>
                        <p>{texts[index].text}</p>
                        <Button
                            type="flashy"
                            onClick={onClick(texts[index].href)}
                            rounded
                        >
                            Join Now
                        </Button>
                    </Animated>
                </div>
            ))}
        </section>
    )
}