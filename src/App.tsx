import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigations/StackNavigation';


const App: React.FC = () => {
  return (
      <NavigationContainer>
        <TabNavigator/>
      </NavigationContainer>
  );
};
export default App;
