import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {Store} from '../store/index.type';
import Modal from './Modal';
// import Login from '../screes/Login';
import useNavigationList from '../hooks/useNavigation';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  // const user = useSelector((x: Store) => x?.user);
  const navigationList = useNavigationList();

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={() => ({headerShown: false})}>
          {navigationList?.map(item => (
            <Tab.Screen
              key={item?.id}
              name={item?.name}
              component={item?.component}
              options={{
                headerTitle: item?.title,
                tabBarShowLabel: false,
                tabBarIcon: ({focused}) => {
                  return (
                    <Icon
                      name={focused ? item?.icon?.focus : item?.icon?.default}
                      color={focused ? '#00ada9' : 'gray'}
                      size={25}
                    />
                  );
                },
              }}
            />
          ))}
        </Tab.Navigator>
      </NavigationContainer>

      {/* <Modal visible={!user}>
        <Login />
      </Modal> */}
    </>
  );
}
