import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HeaderTitle} from '../../layouts/Header';
import BoardScreen from '../../screens/Board';
import BoardDetailScreen from '../../screens/BoardDetail';
import CreateBoardScreen from '../../screens/CreateBoard';

const Stack = createNativeStackNavigator();

export default function BoardStack() {
  return (
    <Stack.Navigator initialRouteName="BoardScreen">
      <Stack.Screen
        name="BoardScreen"
        component={BoardScreen}
        options={{
          title: '소 통',
          headerTitleAlign: 'center',
          headerLeft: HeaderTitle,
        }}
      />
      <Stack.Screen
        name="BoardDetailScreen"
        component={BoardDetailScreen}
        options={{
          title: '게 시 글',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="CreateBoardScreen"
        component={CreateBoardScreen}
        options={{
          title: '게 시 글 작 성',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
