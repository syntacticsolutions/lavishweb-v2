import React, {useState, useEffect} from 'react'

import {useWindowScrollY} from '../../../context/scroll-context'

export default function Animated ({type, children, targetRef, delay, padding = 0}) {
    const [transitioned, setTransitioned] = useState(false)
    const scrollY = useWindowScrollY()
    const [timer, setTimer] = useState()

    useEffect(function(){

        if (!timer && scrollY) {
            setTimer(setTimeout(() => {
                const {offsetTop, offsetHeight} = targetRef.current
                const targetDistanceFromTop = offsetTop + offsetHeight / 2 - padding
                if (!transitioned && scrollY >= targetDistanceFromTop) {
                    setTransitioned(true)
                }
                setTimer(undefined)
            }, delay * 200))
        }

    }, [scrollY]) // eslint-disable-line

    return (<div className={`lavish-animate ${transitioned ? `animated ${type}`: ''}`}>{children}</div>)
}