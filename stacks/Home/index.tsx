import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/Home';
import PostScreen from '../../screens/Post';
import PostDetailScreen from '../../screens/PostDetail';
import {useSelector} from 'react-redux';
import {Store} from '../../store/index.type';
import {Platform} from 'react-native';
import {HeaderRight, HeaderTitle} from '../../layouts/Header';
import SearchScreen from '../../screens/Search';

const Stack = createNativeStackNavigator();
const os = Platform.OS;

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: '언 어',
          headerTitleAlign: 'center',
          headerLeft: HeaderTitle,
          headerRight: HeaderRight,
        }}
      />
      <Stack.Screen
        name="PostScreen"
        component={PostScreen}
        options={{title: '항 목'}}
      />
      <Stack.Screen
        name="PostDetailScreen"
        component={PostDetailScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: '검 색',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="SearchDetailScreen"
        component={PostDetailScreen}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
}
