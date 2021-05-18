import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import AuthenticationContextWrapper from './AuthenticationContextWrapper'
import ProtectedRoute from './Components/ProtectedRoute'
import Navbar from './Components/Navbar'
import Profile from './Pages/Profile/Profile'
import Projects from './Pages/Projects'
import Home from './Pages/Home'
import Users from './Pages/Users'
import Project from './Pages/Project'
import ContributorInvitation from './Pages/ContributorInvitation';
import EmailVerification from './Components/EmailVerification'
import Login from './Pages/Login'
import Register from './Pages/Register'
import RegistrationSubmissionConfirmation from './Components/RegistrationSubmissionConfirmation';

function App() {
  return (
      <Router>
        <AuthenticationContextWrapper>
          
          {/* only render navbar when not on login */}
          <Navbar /> 
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register/confirmation" component={RegistrationSubmissionConfirmation} />
            <Route path="/register" component={Register} />
            <Route path="/signup/emailVerification" component={EmailVerification} />
            <ProtectedRoute path="/users/:user_id" component={Profile} />
            <ProtectedRoute path="/users" component={Users} />
            <ProtectedRoute path="/projects/:project_id" component={Project} />
            <ProtectedRoute path="/projects" component={Projects} />
            <ProtectedRoute path="/home" component={Home} />
            <ProtectedRoute path="/contributor_invitation" component={ContributorInvitation} />
          </Switch>
      </AuthenticationContextWrapper>
    </Router>

  )
}

export default App;
