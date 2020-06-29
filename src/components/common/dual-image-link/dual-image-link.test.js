import React from 'react';
import {render} from '@testing-library/react';
import DualImageLink from './'

import {WindowScrollProvider} from '../../../context/scroll-context'

const resolvedImages = [
    'contemporary-corporate-digital-technology-data-PNWFTUE.jpg',
    'close-up-view-of-business-man-working-place-2F3WVND.jpg',
  ].map(image => require(`../../../assets/images/${image}`))

const imageTexts = [
    {
      title: 'Software Mentorship',
      text: 'Learn how to build complex web projects like the pros with feedback sessions, weekly mentorship, and intensive project building jams.'
    },
    {
      title: 'Coding Blog',
      text: 'Check out some videos and blog posts from web creators that have over 12 years of experience in the software industry.'
    }
  ]

test('Should render 2 images', () => {
    const {container} = render(
        <WindowScrollProvider>
            <DualImageLink images={resolvedImages} texts={imageTexts} />
        </WindowScrollProvider>
    )

    const numberOfImages = container.querySelectorAll('.dual-link-image').length

    expect(numberOfImages).toBe(2)
})

// Should navigate on click TODO