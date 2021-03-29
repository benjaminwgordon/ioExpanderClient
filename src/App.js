import Login from './Pages/Login'
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import AuthenticationContextWrapper from './AuthenticationContextWrapper'
import Profile from './Pages/Profile'
import Navbar from './Components/Navbar'

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
            projects
          </Route>

          <Route exact path="/">
            home
          </Route>

      </AuthenticationContextWrapper>
    </Router>

  )
}

export default App;
