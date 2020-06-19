import React, {useState} from 'react';
import MenuBar from './components/menu-bar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

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

const home = navLinks.shift()

function App() {
  const [lightMode, setLightMode] = useState(false)

  return (
    <div className={`App ${lightMode && 'light'}`}>
      <WindowScrollProvider>
        <Router>
          <MenuBar
            onSetLightMode={setLightMode}
            {...{lightMode, navLinks: [home, ...navLinks]}}
          />
          <Switch>
            <Route exact path="/" component={() => React.createElement(require('./pages/home').default)} />
            {navLinks.map(getComponent)}
          </Switch>
        </Router>
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
        >
          <component/>
        </Route>
}

export default App;
