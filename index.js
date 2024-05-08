/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import firestore from '@react-native-firebase/firestore';
AppRegistry.registerComponent(appName, () => App);
export { firestore };