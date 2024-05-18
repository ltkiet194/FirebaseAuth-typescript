import React from 'react';
import { StatusBar } from 'react-native';
import { colors } from './constants/colors';

import Router from './routers/Router';
import { initializeFirebase } from './firebase/firebase';

const App = () => {
  initializeFirebase();
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.sheetColor} />
      <Router />
    </>
  );
};

export default App;