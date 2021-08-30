import React, { useState, useEffect } from 'react';
import './App.css';
import { AmplifyAuthenticator, AmplifyAuthContainer, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import NotesApp from './NotesApp';

import styled from 'styled-components'

const SignOut = styled.div`
  max-width: 150px;
  margin: auto;
  margin-right: 0;
`;

const AuthStateApp = () => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
      return onAuthUIStateChange((nextAuthState, authData) => {
          setAuthState(nextAuthState);
          setUser(authData)
      });
  }, []);

return authState === AuthState.SignedIn && user ? (
    <div className="App">
        <SignOut>
          <AmplifySignOut />
        </SignOut>
        <NotesApp username={user.username} />
    </div>
  ) : (
    <div className="App">
      <h1>Notes App</h1>
      <AmplifyAuthContainer>
          <AmplifyAuthenticator usernameAlias="email">
            <AmplifySignIn
              hideSignUp="true"
              usernameAlias="email"
              slot="sign-in"
              ></AmplifySignIn>
          </AmplifyAuthenticator>
      </AmplifyAuthContainer>
    </div>
);
}

export default AuthStateApp;
