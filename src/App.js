import React, {useState, useEffect} from 'react';
import MenuBar from './components/menu-bar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


import {WindowScrollProvider} from './context/scroll-context';
import {withAuthUser} from './context/user-context'
import PostCreator from './pages/post-creator'

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
    title: "Login",
    path: '/login'
  }
]


const home = navLinks.shift()

function App() {
  const [lightMode, setLightMode] = useState(true)

  // useEffect(() => {
  //   // initAuth()
  //   // .then(user => {
  //   //   if (!this.$store.state.UserModule.loggedInUser.uid) {

  //   //   }
  //   // })
  //   // .catch(err => { this.$router.push('/signin') })
  // }, [])

  return withAuthUser(
    // return (
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

export default App;
