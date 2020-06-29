import React from 'react';
import {render, screen, fireEvent } from '@testing-library/react';
import Toggle from './';
const mockFn = jest.fn()

test('Should render rounded button', () => {
    const {container} = render(<Toggle checked>Toggle</Toggle>)
    const isChecked = container.innerHTML.includes('checked')
    expect(isChecked).toBeTruthy()
})



