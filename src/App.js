import React, {useState} from 'react';
import MenuBar from './components/menu-bar'
import Helmet from 'react-helmet'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import {WindowScrollProvider} from './context/scroll-context';
import PostCreator from './pages/post-creator/index'
import PostViewer from './pages/post-viewer'
import UserAdmin from './pages/user-admin'
import Pricing from './pages/pricing'
import Footer from './components/common/footer'
import Home from './pages/home'

const navLinks = [
  {
    title: 'Blog',
    path: '/blog',
  },
  {
    title: 'Web Dev',
    path: '/web-dev'
  },
  {
    title: 'Cloud',
    path: '/cloud'
  },
  // {
  //   title: 'Algorithms',
  //   path: '/algorithms'
  // },
  {
    title: 'Brain Hacking',
    path: '/health'
  },
  {
    title: "Login",
    path: '/login'
  }
]

function App() {
  const [lightMode, setLightMode] = useState(true)

  return (
    <div className={`App ${lightMode ? 'light' : 'dark'}`}>
      <WindowScrollProvider>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta
            name="description"
            content="Lavish Web Tech Blog - Learn how to make the most extravegant websites, and build with some of the most cutting-edge technologies in the industry."
          />
          <meta property="og:site_name" content="Lavish Web" />
        </Helmet>
        <Router>
          <MenuBar
            onSetLightMode={setLightMode}
            {...{lightMode, navLinks}}
          />
          <Switch>
            <Route exact path="/" component={Home} />
            {navLinks.map(getComponent)}
            <Route exact path="/pricing" component={Pricing} />
            <Route exact path="/edit-post" component={PostCreator} />
            <Route exact path="/edit-post/:id" component={PostCreator} />
            <Route path='/view-post/:id' component={PostViewer} />
            <Route path='/view-post/:id/:slug' component={PostViewer} />
            <Route path='/user-admin' component={UserAdmin} />
          </Switch>
        </Router>
        <Footer pages={pages} />
      </WindowScrollProvider>
    </div>
  );
}


const getComponent = (link, index) => {
  let component
  try {
    component = require(`./pages${link.path}`).default
  } catch(err) {
    component = () => <div style={{color:'white'}}>Under Construction</div>
  }
  return <Route
          key={index}
          path={link.path}
          component={component}
        />
}

const pages = [
  {url: '/', title: 'Home'},
  {url: '/blog', title: 'Blog'},
  {url: '/login', title: 'Login / Signup'}
]

export default App;
