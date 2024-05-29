import React, { useEffect } from 'react';
import { AppState, StatusBar } from 'react-native';
import { colors } from './constants/colors';

import Router from './routers/Router';
import { initializeFirebase } from './firebase/firebase';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App = () => {
  initializeFirebase();
  useEffect(() => {
    const handleAppStateChange = (nextAppState: any) => {
      if (nextAppState === 'background') {
        // Ứng dụng chuyển sang nền hoặc bị đóng
        console.log('Ứng dụng chuyển sang nền hoặc bị đóng');
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);
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