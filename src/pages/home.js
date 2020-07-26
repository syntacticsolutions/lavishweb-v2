import React, {useRef} from 'react'
import DualImageLink from '../components/common/dual-image-link';
import Header from '../components/common/header'
import IconRow from '../components/common/icon-row'
import ImageRow from '../components/common/image-row';

import introVideo from '../assets/images/Montage.mp4'

const images = [
    'contemporary-corporate-digital-technology-data-PNWFTUE.jpg',
    'close-up-view-of-business-man-working-place-2F3WVND.jpg',
  ]
  
  const promoImage = require('../assets/images/cyber-monday-promotion-poster-X2CDZUJ.jpg')
  
  const resolvedImages = images.map(image => require(`../assets/images/${image}`))
  
  const imageTexts = [
    {
      title: 'Web Development Courses',
      text: 'Learn how to build complex web projects like the pros with weekly mentorship and intensive project building jams.'
    },
    {
      title: 'Coding Blog',
      text: 'Check out some videos and blog posts from all kinds of tech creators with various backgrounds.'
    }
  ]
  
  const imageRow1Images = [
    {path:'bitcoin-miner-it-hardware-PJM3V5Y.jpg', name: 'bitcoin-rig'},
    {path:'hands-of-five-businessman-holding-wooden-blocks-PGJ8S69.jpg', name: 'wooden-blocks'},
    {path:'computer-motherboard-with-cpu-circuit-board-P39FZ2N.jpg', name: 'circuit-board'},
    {path:'closeup-of-male-hands-is-holding-cellphone-8RCYG7V.jpg', name: 'city-slicker'},
    {path: 'webdesign-project-desk-PKH79U9.jpg', name: 'computer-with-code'},
    {path: 'using-programming-language-7BD2PFH.jpg', name: 'white-boarding-session' }
  ].map(({path, ...rest}) => ({path: require(`../assets/images/${path}`), ...rest}))

export default function Home() {
    const promoContent = useRef(null)
    return (
        <div>
            <section className="video-container">
                <video className="intro-video" autoPlay muted>
                    <source src={introVideo} type="video/mp4" />

                Sorry, your browser doesn't support embedded videos.
            </video>
            </section>
            <DualImageLink images={resolvedImages} texts={imageTexts} />
            <Header title="Our Features" text="We offer a myriad of mentorship services to get you that dream job you've always wanted. Opportunities abound!" />
            <IconRow />

            {/* <Header title="Our Pricing" text="Some need advice while others need more in-depth training. Our services are geared towards providing the best solution for you!" /> */}
            {/* <Pricing /> */}
            <ImageRow images={imageRow1Images} />
            {/* <Header title="The Professionals" text="All of our Tech Pros come from top-tier tech companies such as Apple, Amazon, Twitter, Facebook, LinkedIn, and Uber. We'll teach you everything that you need to know in order to become an elite coder." /> */}
        </div>
    )
}