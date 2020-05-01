import React, {useRef} from 'react';
import Button from './components/common/button';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DualImageLink from './components/common/dual-image-link';
import Header from './components/common/header'
import IconRow from './components/common/icon-row'
import BackgroundImage from './components/common/background-image'
import Animated from './components/common/animated'
import Pricing from './components/pricing'
import ImageRow from './components/common/image-row';
import {WindowScrollProvider} from './context/scroll-context';

const navLinks = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Mentoring',
    path: '/pricing',
  },
  {
    title: 'Blog',
    path: '/blog',
  },
  {
    title: 'Contact',
    path: '/contact',
  },
  {
    title: "About Us",
    path: '/about '
  }
]

const images = [
  'contemporary-corporate-digital-technology-data-PNWFTUE.jpg',
  'close-up-view-of-business-man-working-place-2F3WVND.jpg',
]

const promoImage = require('./assets/images/cyber-monday-promotion-poster-X2CDZUJ.jpg')

const resolvedImages = images.map(image => require(`./assets/images/${image}`))

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

const imageRow1Images = [
  {path:'bitcoin-miner-it-hardware-PJM3V5Y.jpg', name: 'bitcoin-rig'},
  {path:'hands-of-five-businessman-holding-wooden-blocks-PGJ8S69.jpg', name: 'wooden-blocks'},
  {path:'computer-motherboard-with-cpu-circuit-board-P39FZ2N.jpg', name: 'circuit-board'},
  {path:'closeup-of-male-hands-is-holding-cellphone-8RCYG7V.jpg', name: 'city-slicker'},
  {path: 'webdesign-project-desk-PKH79U9.jpg', name: 'computer-with-code'},
  {path: 'using-programming-language-7BD2PFH.jpg', name: 'white-boarding-session' }
].map(({path, ...rest}) => ({path: require(`./assets/images/${path}`), ...rest}))

function App() {
  const width = window.innerWidth + 'px'
  const promoContent = useRef(null)
  return (
    <div className="App">
      <WindowScrollProvider>
        <nav className="lavish-menu-bar">
          <ul>
            <svg className="lavish-logo" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 290 290"><title>Untitled-1</title><path d="M710,143a137,137,0,1,1-96.87,40.13A136.08,136.08,0,0,1,710,143m0-8A145,145,0,1,0,855,280,145,145,0,0,0,710,135Z" transform="translate(-565 -135)"/><polygon points="93.5 247 63.5 247 22.5 75 52.5 75 93.5 247"/><rect x="73" y="217" width="91" height="30"/><path d="M659.25,341.46l-5.12-21.73q21.2-32.79,42.4-65.56l35.29.42-55.89,86.87Z" transform="translate(-565 -135)"/><path d="M792.17,367.55l-25.39,14.36a.43.43,0,0,1-.57-.16L695.94,257.51a.42.42,0,0,1,.16-.57L708,256l24-1Z" transform="translate(-565 -135)"/><polygon points="201 247 231.21 247 272.5 75 242.29 75 201 247"/><path d="M709,249" transform="translate(-565 -135)"/><path d="M911,361" transform="translate(-565 -135)"/><path d="M732,377" transform="translate(-565 -135)"/><path d="M690,340" transform="translate(-565 -135)"/><path d="M707,341" transform="translate(-565 -135)"/><path d="M655.42,329.42" transform="translate(-565 -135)"/></svg>
            {navLinks.map(({title, path}, ind) => (<li key={ind}>{title}</li>))}
            <Button type="flashy" rounded>Pricing</Button>
          </ul>
        </nav>

        <Carousel autoPlay infiniteLoop interval={5000} showThumbs={false} showArrows={false}>
            {
              resolvedImages.map((image, index) => (
                <div className="lavish-carousel-image"key={index}>
                  <img width={width} src={image} alt={index} />
                  <div className="overlay" />
                </div>
              ))
            }
        </Carousel>
        <DualImageLink images={resolvedImages} texts={imageTexts}/>
        <Header title="Our Features" text="We offer a myriad of mentorship services to get you that dream job you've always wanted. Opportunities abound!" />
        <IconRow />
        <section ref={promoContent}>
          <BackgroundImage image={promoImage}>
            <Animated type="fadeInRight" targetRef={promoContent}>
              <Header
                title="Awesome savings for this summer!"
                text="During the summer we are offering a discount for our intensive full stack project building program."
                btnText="Enroll Now!"
              >
                <span class="text-danger big bolder">50% Off</span>
              </Header>
            </Animated>
          </BackgroundImage>
        </section>
        <Header title="Our Pricing" text="Some need advice while others need more in-depth training. Our services are geared towards providing the best solution for you!"/>
        <Pricing />
        <ImageRow images={imageRow1Images} />
        <Header title="The Professionals" text="All of our Tech Pros come from top-tier tech companies such as Apple, Amazon, Twitter, Facebook, LinkedIn, and Uber. We'll teach you everything that you need to know in order to become an elite coder." />
      </WindowScrollProvider>
    </div>
  );
}

export default App;
