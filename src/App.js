import React, { useState, useEffect } from 'react';
import './App.css';
import { AmplifyAuthenticator, AmplifyAuthContainer, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import NotesApp from './NotesApp';

const AuthStateApp = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
      return onAuthUIStateChange((nextAuthState, authData) => {
          setAuthState(nextAuthState);
          setUser(authData)
      });
  }, []);

return authState === AuthState.SignedIn && user ? (
    <div className="App">
        <NotesApp username={user.username} />
        <AmplifySignOut />
    </div>
  ) : (
    <AmplifyAuthContainer>
        <AmplifyAuthenticator usernameAlias="email">
          <AmplifySignIn
            hideSignUp="true"
            usernameAlias="email"
            slot="sign-in"
          ></AmplifySignIn>
        </AmplifyAuthenticator>
    </AmplifyAuthContainer>
);
}

export default AuthStateApp;
