import React, {useRef} from 'react'
import Button from '../common/button'
import Animated from '../common/animated'

const pricingConfig = [
    {
        title: 'Professional Advice+',
        price: '$50 / 1 hour',
        options: ['Advice about which tech is most relevant.', 'Architecture advice', 'Planning advice', 'Free LinkedIn recommendation', 'Some restrictions apply']
    },
    {
        title: 'Weekly Training',
        price: '$300 / 1 week',
        options: ['Design advice', 'Architecture advice', 'Planning advice', '3 hours per week', 'Pair Coding Sessions', 'Free LinkedIn recommendation', 'Some restrictions apply']
    },
    {
        title: 'Intensive Training',
        price: '$5000 / 3 months',
        options: ['Apple & Uber Veteran training', 'Professional advice', '4 hours per week', 'Pair Coding Sessions', 'Full stack intensive training', 'Free LinkedIn recommendation']
    }
]

export default function Pricing() {
    const container = useRef(null)

    return (
        <div className="lavish-pricing container">
            <div className="row" ref={container} >
                {pricingConfig.map((obj, index) => (
                    <div key={index} className="col-lg-4 col-md-6 pricing-card">
                        <Animated type="flipInY" delay={index} targetRef={container}  padding={300}>
                            <div className="single-pricing text-center">
                                <div className="pricing-header">
                                    <h3>{obj.title}</h3>
                                    <span>{obj.price}</span>
                                </div>
                                <div className="pricing-body">
                                    <ul>
                                        {obj.options.map((option, idx) => (

                                            <li key={idx}>{option}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="pricing-btn">
                                    <Button type="flashy" rounded>Join Now</Button>
                                </div>
                            </div>
                        </Animated>
                    </div>
                ))}
            </div>
        </div>
    )
}