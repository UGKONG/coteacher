import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import useNavigationList from '../hooks/useNavigationList';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const navigationList = useNavigationList();

  return (
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
                    color={focused ? '#00ada9' : '#bbbbbb'}
                    size={25}
                  />
                );
              },
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
