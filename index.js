import * as React from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './src/App';

export default function Main() {
  return (
    <PaperProvider style={{ flex: 1 }}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);