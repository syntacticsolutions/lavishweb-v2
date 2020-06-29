import React, {useRef} from 'react';
import {render} from '@testing-library/react';
import Animated from './'
import {WindowScrollProvider, useWindowScrollY} from '../../../context/scroll-context'

const obj = {
    useWindowScrollY
}
const Component = () => {
    const cont = useRef(null)
    return (
        <WindowScrollProvider>
            <div className="animated-container" ref={cont}>
                <Animated type="fadeInLeft" targetRef={cont}>
                    children
                </Animated>
            </div>
        </WindowScrollProvider>
    )
}

test('Should render children', () => {
    const {container} = render(<Component />)

    const childrenText = container.querySelector('.lavish-animate').innerHTML

    expect(childrenText).toBe('children')
})