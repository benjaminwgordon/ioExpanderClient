import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Auth from './Pages/Auth'
import AuthenticationContextWrapper from './AuthenticationContextWrapper'
import ProtectedRoute from './Components/ProtectedRoute'
import Navbar from './Components/Navbar'
import Profile from './Pages/Profile/Profile'
import Projects from './Pages/Projects'
import Home from './Pages/Home'

function App() {
  return (
      <Router>
        <AuthenticationContextWrapper>
          
          <Navbar />
          <Switch>
            <ProtectedRoute path="/users/:id?" component={Profile} />
            <ProtectedRoute path="/projects" component={Projects} />
            <ProtectedRoute path="/home" component={Home} />
            <Route component={Auth} />
          </Switch>
      </AuthenticationContextWrapper>
    </Router>

  )
}

export default App;
