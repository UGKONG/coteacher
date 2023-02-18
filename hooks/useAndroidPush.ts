import PushNotificationAndroid from 'react-native-push-notification';

export default function useAndroidPush() {
  return (title?: string, message?: string): void => {
    PushNotificationAndroid.localNotification({
      channelId: 'push',
      title: title ?? '타이틀',
      message: message ?? '내용',
      allowWhileIdle: true,
    });
  };
}
