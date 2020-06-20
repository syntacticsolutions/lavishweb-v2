import React, {useRef} from 'react';
import Animated from '../animated'

const iconRowSections = [
    {
        icon: 'comments-alt-dollar',
        title: 'Professonal Feedback',
        text: 'Get professional advice on how to improve your portfolio and add challenging accomplishments.'
    },
    {
        icon: 'chalkboard-teacher',
        title: 'Weekly Mentoring',
        text: 'Get 1 on 1 advice and code style walkthroughs that will improve your architecture skills.',
    },
    {
        icon: 'space-shuttle',
        title: 'Master Training Projects',
        text: 'Learn how to succeed by building something that is meaningful to you. Propel your career by utilizing your strengths.'
    },
    {
        icon: 'file-video',
        title: 'Blog Posts and Video Trainings',
        text: 'Watch some of our expert-lead video trainings and learn how to build projects like a true coder.'
    }
]

export default function IconRow ({sections}) {
    const container = useRef(null)
    return (
        <section ref={container} className="lavish-icon-row">
            {iconRowSections.map((section, idx) => (
                <div key={idx} className="single-feature">
                    <Animated targetRef={container} type="fadeInUp" delay={idx} padding={200}>
                        <i className={`fal fa-${section.icon}`}></i>
                        <h3>{section.title}</h3>
                        <p>{section.text}</p>
                    </Animated>
                </div>
            ))}
        </section>
    )
}