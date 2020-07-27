import React, {useState} from 'react';
import MenuBar from './components/menu-bar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import {WindowScrollProvider} from './context/scroll-context';
import {withAuthUser} from './context/user-context'
import PostCreator from './pages/post-creator'
import PostViewer from './pages/post-viewer'
import Footer from './components/common/footer'

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
  {
    title: 'Algorithms',
    path: '/algorithms'
  },
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

  return withAuthUser(
    <div className={`App ${lightMode ? 'light' : 'dark'}`}>
      <WindowScrollProvider>
        <Router>
          <MenuBar
            onSetLightMode={setLightMode}
            {...{lightMode, navLinks}}
          />
          <Switch>
            <Route exact path="/" component={() => React.createElement(require('./pages/home').default)} />
            {navLinks.map(getComponent)}
            <Route exact path="/edit-post" component={PostCreator} />
            <Route exact path="/edit-post/:id" component={PostCreator} />
            <Route path='/view-post/:id' component={PostViewer} />
            <Route path='/view-post/:id/:slug' component={PostViewer} />
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
