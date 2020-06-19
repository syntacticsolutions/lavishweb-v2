import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';


test('should render the menu-bar', () => {
  const {container} = render(<App />)
  const menuBar = container.querySelector('.lavish-menu-bar')
  expect(menuBar).not.toBe(null);
});

test('should render the home page video', () => {
  const {container} = render(<App />)
  const video = container.querySelector('.video-container')
  expect(video).not.toBe(null);
})

test('should change the route to blog', () => {
  const {container} = render(<App />)
  fireEvent.click(screen.getByText('Blog'))
  const video = container.querySelector('.video-container')
  expect(video).toBe(null)
})
