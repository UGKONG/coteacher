import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/Home';
import PostScreen from '../../screens/Post';
import PostDetailScreen from '../../screens/PostDetail';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: '언어'}}
      />
      <Stack.Screen
        name="PostScreen"
        component={PostScreen}
        options={{title: '기술'}}
      />
      <Stack.Screen
        name="PostDetailScreen"
        component={PostDetailScreen}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
}
