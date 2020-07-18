import React from 'react';
import {render, screen, fireEvent } from '@testing-library/react';
import Button from './'
const mockFn = jest.fn()

test('Should render button text', () => {
    const {container} = render(<Button >Click Me</Button>)

    const childrenText = container.querySelector('.lavish-btn').innerHTML

    expect(childrenText).toBe('Click Me')
})

test('Should render rounded button', () => {
    const {container} = render(<Button rounded>Click Me</Button>)
    const isRounded = container.innerHTML.includes('rounded')
    expect(isRounded).toBeTruthy()
})

test('Should render primary type button', () => {
    const {container} = render(<Button type="primary">Click Me</Button>)
    const isPrimary = container.innerHTML.includes('primary')
    expect(isPrimary).toBeTruthy()
})

test('Should fire an event on click', () => {
    render(<Button onClick={mockFn}>Click Me</Button>)
    fireEvent.click(screen.getByText('Click Me'))
    expect(mockFn).toHaveBeenCalled();
})