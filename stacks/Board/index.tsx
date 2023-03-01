import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HeaderNoticeIcon, HeaderTitle} from '../../layouts/Header';
import BoardScreen from '../../screens/Board';
import BoardDetailScreen from '../../screens/BoardDetail';
import CreateBoardScreen from '../../screens/CreateBoard';
import NoticeScreen from '../../screens/Notice';

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
          headerRight: HeaderNoticeIcon,
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
      <Stack.Screen
        name="NoticeScreen"
        component={NoticeScreen}
        options={{
          title: '댓 글 알 림',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
