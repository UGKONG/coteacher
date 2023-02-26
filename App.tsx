import {useEffect, useMemo} from 'react';
import {Platform, StatusBar, StatusBarStyle} from 'react-native';
import Navigation from './layouts/Navigation';
import SplashScreen from 'react-native-splash-screen';
import {useSelector} from 'react-redux';
import {Store} from './store/index.type';
import Modal from './layouts/Modal';
import LoginScreen from './screens/Login';

const os = Platform.OS;

export default function App() {
  const user = useSelector((x: Store) => x?.user);

  const barStyle = useMemo<StatusBarStyle>(() => {
    return os === 'ios' ? 'dark-content' : 'light-content';
  }, [os]);

  const isLoginModal = useMemo<boolean>(() => {
    return user ? false : true;
  }, [user]);

  const init = (): void => {
    setTimeout(() => SplashScreen.hide(), 1000);
  };

  useEffect(init, []);

  return (
    <>
      <StatusBar barStyle={barStyle} />
      <Navigation />
      <Modal visible={isLoginModal} style="overFullScreen">
        <LoginScreen />
      </Modal>
    </>
  );
}
