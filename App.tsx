/* eslint-disable react/react-in-jsx-scope */

import {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './layouts/Navigation';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const statusBarStyle = isDarkMode ? Colors.darker : Colors.lighter;

  useEffect(() => SplashScreen.hide(), []);

  return (
    <>
      <StatusBar barStyle={'default'} backgroundColor={statusBarStyle} />
      <Navigation />
    </>
  );
}
