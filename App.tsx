import {useEffect, useMemo} from 'react';
import {Platform, StatusBar} from 'react-native';
import Navigation from './layouts/Navigation';
import SplashScreen from 'react-native-splash-screen';

type BarStyle = 'default' | 'dark-content' | 'light-content';

const os = Platform.OS;

export default function App() {
  const barStyle = useMemo<BarStyle>(() => {
    return os === 'ios' ? 'dark-content' : 'light-content';
  }, [os]);

  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 1000);
  }, []);

  return (
    <>
      <StatusBar barStyle={barStyle} />
      <Navigation />
    </>
  );
}
