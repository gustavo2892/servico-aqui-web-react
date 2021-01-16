import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import SignUpProvider from '../pages/SignUpProvider';
import ChoiceSignUp from '../pages/ChoiceSignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Announcement from '../pages/Announcement';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/choice-sign-up" component={ChoiceSignUp} />
      <Route path="/register-provider" component={SignUpProvider} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/announcement" component={Announcement} isPrivate />
    </Switch>
  );
}
