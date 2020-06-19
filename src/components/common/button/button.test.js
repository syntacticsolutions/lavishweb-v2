import React from 'react';
import {render} from '@testing-library/react';
import Button from './'

const promoImage = require('../../../assets/images/cyber-monday-promotion-poster-X2CDZUJ.jpg')

test('Should render button text', () => {
    const {container} = render(<Button image={promoImage}>Click Me</Button>)

    const childrenText = container.querySelector('.lavish-btn').innerHTML

    expect(childrenText).toBe('Click Me')
})

test('Should render background image from props', () => {
    const {container} = render(<Button image={promoImage}>children</Button>)

    const hasImageBackgroundStyle = container.innerHTML.includes('style="background-image: url(cyber-monday-promotion-poster-X2CDZUJ.jpg);')
    
    expect(hasImageBackgroundStyle).toBe(true)
})