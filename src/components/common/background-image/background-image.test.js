import React from 'react';
import {render} from '@testing-library/react';
import BackgroundImage from './'

const promoImage = require('../../../assets/images/cyber-monday-promotion-poster-X2CDZUJ.jpg')

test('Should render children', () => {
    const {container} = render(<BackgroundImage image={promoImage}>children</BackgroundImage>)

    const childrenText = container.querySelector('.lavish-background-image').innerHTML

    expect(childrenText).toBe('children')
})

test('Should render background image from props', () => {
    const {container: {innerHTML}} = render(<BackgroundImage image={promoImage}>children</BackgroundImage>)

    const hasImageBackgroundStyle = innerHTML.includes('style="background-image: url(cyber-monday-promotion-poster-X2CDZUJ.jpg);')
    
    expect(hasImageBackgroundStyle).toBeTruthy()
})