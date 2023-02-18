/* eslint-disable react/react-in-jsx-scope */

import {useEffect} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './layouts/Navigation';

export default function App() {
  useEffect(() => SplashScreen.hide(), []);

  return (
    <>
      <StatusBar barStyle={'default'} />
      <Navigation />
    </>
  );
}
