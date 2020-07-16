import React from 'react';
import {render, screen, fireEvent } from '@testing-library/react';
import Header from './'
const mockFn = jest.fn()

const title = "Awesome savings for this summer!"
const text = "During the summer we are offering a discount for our intensive full stack project building program."
const btnText = "Enroll Now!"

const JsxHeader = () => <Header
title={title}
text={text}
btnText={btnText}
/>

test('Should render header title', () => {
    const {container} = render( <JsxHeader />)
    
    const h1 = screen.getByText(title)

    expect(h1).toBeDefined()
})

test('Should render header text', () => {
    const {container} = render( <JsxHeader />)
    
    const p = screen.getByText(text)

    expect(p).toBeDefined()
})

test('Should render header btnText', () => {
    const {container} = render( <JsxHeader />)
    
    const Button = screen.getByText(btnText)

    expect(Button).toBeDefined()
})
