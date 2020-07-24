import React, {useState, useEffect} from 'react';
import MenuBar from './components/menu-bar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


import {WindowScrollProvider} from './context/scroll-context';
import {withAuthUser} from './context/user-context'
import PostCreator from './pages/post-creator'
import Footer from './components/common/footer'

const navLinks = [
  {
    title: 'About Us',
    path: '/',
  },
  {
    title: 'Blog',
    path: '/blog',
  },
  {
    title: "Login",
    path: '/login'
  }
]


const home = navLinks.shift()

function App() {
  const [lightMode, setLightMode] = useState(true)

  return withAuthUser(
    <div className={`App ${lightMode ? 'light' : 'dark'}`}>
      <WindowScrollProvider>
        <Router>
          <MenuBar
            onSetLightMode={setLightMode}
            {...{lightMode, navLinks: [home, ...navLinks]}}
          />
          <Switch>
            <Route exact path="/" component={() => React.createElement(require('./pages/home').default)} />
            {navLinks.map(getComponent)}
            <Route exact path="/edit-post" component={PostCreator} />
            <Route exact path="/edit-post/:id" component={PostCreator} />
          </Switch>
        </Router>
        <Footer pages={pages} />
      </WindowScrollProvider>
    </div>
  );
}


const getComponent = (link, index) => {
  let Component
  try {
    Component = require(`./pages${link.path}`).default
  } catch(err) {
    Component = () => <div style={{color:'white'}}>Under Construction</div>
  }
  return <Route
          key={index}
          path={link.path}
        >
          <Component/>
        </Route>
}

const pages = [
  {url: '/', title: 'Home'},
  {url: '/blog', title: 'Blog'},
  {url: '/login', title: 'Login / Signup'}
]

export default App;
