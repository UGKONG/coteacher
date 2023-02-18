/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {Store} from '../store/index.type';
import Modal from './Modal';
// import Login from '../screes/Login';
import useNavigation from '../hooks/useNavigation';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const icon = {
  home: {
    default: 'people-outline',
    focus: 'people-sharp',
  },
  notice: {
    default: 'notifications-outline',
    focus: 'notifications-sharp',
  },
  setting: {
    default: 'ios-construct-outline',
    focus: 'ios-construct',
  },
  none: {
    default: 'ios-help-outline',
    focus: 'ios-help-sharp',
  },
};

export default function Navigation() {
  // const user = useSelector((x: Store) => x?.user);
  const navigation = useNavigation();

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={() => ({headerShown: false})}>
          {navigation?.map(item => (
            <Tab.Screen
              key={item?.id}
              name={item?.name}
              component={item?.component}
              options={{
                headerTitle: item?.title,
                tabBarShowLabel: false,
                tabBarIcon: ({focused, size}) => {
                  return (
                    <Icon
                      name={focused ? item?.icon?.focus : item?.icon?.default}
                      color={focused ? '#00ada9' : 'gray'}
                      size={26}
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
