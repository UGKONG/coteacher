import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HeaderRight, HeaderTitle} from '../../layouts/Header';
import BookScreen from '../../screens/Book';
import PostDetailScreen from '../../screens/PostDetail';
import SearchScreen from '../../screens/Search';

const Stack = createNativeStackNavigator();

export default function BookStack() {
  return (
    <Stack.Navigator initialRouteName="BookScreen">
      <Stack.Screen
        name="BookScreen"
        component={BookScreen}
        options={{
          title: '북 마 크',
          headerTitleAlign: 'center',
          headerLeft: HeaderTitle,
        }}
      />
      <Stack.Screen
        name="BookDetailScreen"
        component={PostDetailScreen}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
}
