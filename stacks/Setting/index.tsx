/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingScreen from '../../screens/Setting';

const Stack = createNativeStackNavigator();

export default function SettingStack() {
  return (
    <Stack.Navigator initialRouteName="SettingScreen">
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{title: '설정'}}
      />
    </Stack.Navigator>
  );
}
