import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import ParagraphPracticePage from '../../pages/ParagraphPracticePage';
import { renderTest } from '../../test-utils';

// jest.mock('../../../auth/index.js', async () => {
//   const firebasemock = require('firebase-mock');
//   const mockauth = new firebasemock.MockAuthentication();
//   const mockfirestore = new firebasemock.MockFirestore();
//   const mocksdk = new firebasemock.MockFirebaseSdk(
//     null,
//     () => mockauth,
//     () => mockfirestore,
//   );
//   const firebase = mocksdk.initializeApp();
//   const firestore = firebase.firestore();
//   const firebaseAuth = firebase.auth();

//   const auth = jest.fn();
//   const mAuth = { signInWithRedirect: jest.fn() };

//   auth.GoogleAuthProvider = jest.fn();

//   auth.Auth = jest.fn(() => mAuth);

//   return firebase, { firebaseAuth, firestore, auth };
// });

describe('<ParagraphPracticePage /> render', () => {
  it('ParagraphPracticePage is rendering', () => {
    renderTest(
      <BrowserRouter>
        <ParagraphPracticePage />
      </BrowserRouter>,
    );
  });
});
