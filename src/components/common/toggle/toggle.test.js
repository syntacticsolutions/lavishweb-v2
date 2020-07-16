import React from 'react';
import {render, screen, fireEvent } from '@testing-library/react';
import Toggle from './';

test('Should render rounded button', () => {
    const {container} = render(<Toggle checkbox>Toggle</Toggle>)
    const onClick = container.innerHTML.includes('checkbox')
    expect(onClick).toBeTruthy()
})



