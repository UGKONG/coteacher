import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './store';
// import PushNotification from 'react-native-push-notification';
// import messaging from '@react-native-firebase/messaging';
// import useIosPush from './hooks/useIosPush';
// import useAndroidPush from './hooks/useAndroidPush';

const OS = Platform.OS;

// const popInitialNotification = true;
// const requestPermissions = true;
// const notificationOptions = {popInitialNotification, requestPermissions};
// const channelOptions = {channelId: 'push', channelName: 'push'};

// 백그라운드에서 푸쉬
// messaging().setBackgroundMessageHandler(async ({notification}) => {
//   const iosPush = useIosPush();
//   const androidPush = useAndroidPush();
//   if (!notification) return;
//   const {title, body} = notification;
//   (OS === 'ios' ? iosPush : androidPush)(title, body);
// });

// 푸쉬 초기 셋팅
// PushNotification.configure(notificationOptions);
// PushNotification.createChannel(channelOptions, () => {});

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
