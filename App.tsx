import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './layout/Login';
import Main from './layout/Main';
import { LoginProvider } from './layout/LoginProvider';


const App = () => {
  const Stack = createStackNavigator();

  return (
    <LoginProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='login' component={Login} />
          <Stack.Screen name='home' component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </LoginProvider>

  )
}

export default App
