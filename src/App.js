import Login from './Pages/Login'
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import AuthenticationContextWrapper from './AuthenticationContextWrapper'
import Navbar from './Components/Navbar'
import Profile from './Pages/Profile'
import Projects from './Pages/Projects'

function App() {
  return (
      <Router>
        <AuthenticationContextWrapper>
          
          <Navbar />

          <Route path="/login">
            <Login/>
          </Route>
          
          
          <Route path="/users">
            <Profile targetUserUsername="test"/>
          </Route>
          
          <Route path="/projects">
            <Projects />
          </Route>

          <Route exact path="/">
            home
          </Route>

      </AuthenticationContextWrapper>
    </Router>

  )
}

export default App;
