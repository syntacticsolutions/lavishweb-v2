import React from 'react'

const widths = ['31%', '33%', '36%']
const reverseWidths = ['36%', '31%', '33%']

export default function ImageRow({images}) {

    const calculateWidth = (num) => {
        ++num
        const divisor = Math.ceil(num / 3)

        const indexMinusOffset = (num - (divisor - 1) * 3) - 1
        return divisor % 2 ===  0 ?
            widths[indexMinusOffset] :
            reverseWidths[indexMinusOffset]
    }
    return (
        <section className="lavish-image-row">
            { images.map((image, ind) => (
                <div key={ind} className="image-container" style={{ width: calculateWidth(ind)}}>
                    <img src={image.path} alt={image.name} />
                    <div className="hover-overlay" >+</div>
                </div>
            ))}
        </section>
    )
}