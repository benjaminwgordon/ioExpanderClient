import Auth from './Pages/Auth'
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import AuthenticationContextWrapper from './AuthenticationContextWrapper'
import ProtectedRoute from './Components/ProtectedRoute'
import Navbar from './Components/Navbar'
import Profile from './Pages/Profile'
import Projects from './Pages/Projects'
import Home from './Pages/Home'

function App() {
  return (
      <Router>
        <AuthenticationContextWrapper>
          
          <Navbar />

          <Route path="/login">
            <Auth />
          </Route>
          
          <Switch>
            <ProtectedRoute path="/users/:id?" component={Profile} />
            <ProtectedRoute path="/projects" component={Projects} />
            <Route path="/" component={Home} />
          </Switch>
      </AuthenticationContextWrapper>
    </Router>

  )
}

export default App;
