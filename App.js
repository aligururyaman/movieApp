import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './app/Pages/Home/Home';
import fonts from './app/Utils/fonts';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import MovieScreen from './app/Pages/Movie/MovieScreen';
import PersonScreen from './app/Pages/Person/PersonScreen';
import SearchScreen from './app/Pages/Search/SearchScreen';



const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='MovieScreen'
            component={MovieScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name='PersonScreen'
            component={PersonScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name='SearchScreen'
            component={SearchScreen}
            options={{headerShown: false}}
          />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
