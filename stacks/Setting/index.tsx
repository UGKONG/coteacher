import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HeaderTitle} from '../../layouts/Header';
import SettingScreen from '../../screens/Setting';

const Stack = createNativeStackNavigator();

export default function SettingStack() {
  return (
    <Stack.Navigator initialRouteName="SettingScreen">
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          title: '설 정',
          headerTitleAlign: 'center',
          headerLeft: HeaderTitle,
        }}
      />
    </Stack.Navigator>
  );
}
