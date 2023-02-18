import PushNotificationIOS from '@react-native-community/push-notification-ios';

export default function useIosPush() {
  return (title?: string, message?: string): void => {
    PushNotificationIOS.scheduleLocalNotification({
      alertTitle: title ?? '타이틀',
      alertBody: message ?? '내용',
      fireDate: new Date()?.toISOString(),
    });
  };
}
