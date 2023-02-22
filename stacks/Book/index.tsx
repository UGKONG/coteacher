import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BookScreen from '../../screens/Book';
import PostDetailScreen from '../../screens/PostDetail';

const Stack = createNativeStackNavigator();

export default function BookStack() {
  return (
    <Stack.Navigator initialRouteName="BookScreen">
      <Stack.Screen
        name="BookScreen"
        component={BookScreen}
        options={{title: '북마크'}}
      />
      <Stack.Screen
        name="BookDetailScreen"
        component={PostDetailScreen}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
}
