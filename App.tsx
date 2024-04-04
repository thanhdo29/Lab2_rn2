import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './layout/Login';
import Main from './layout/Main';
import { LoginProvider } from './layout/LoginProvider';
import { Provider } from 'react-redux'
import SpendingScreen from './redux2/SpendingScreen';
import store from './redux2/store';



const App = () => {
  const Stack = createStackNavigator();

  return (
    
    <Provider store={store}>
      <SpendingScreen/>
    </Provider>
  )
}

export default App
