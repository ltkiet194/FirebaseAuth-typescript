import React from 'react';
import { StatusBar } from 'react-native';
import { colors } from './constants/colors';

import Router from './routers/Router';
import { initializeFirebase } from './firebase/firebase';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App = () => {
  initializeFirebase();
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.sheetColor} />
      <Provider store={store}>
        <Router />
      </Provider>
    </>
  );
};

export default App;