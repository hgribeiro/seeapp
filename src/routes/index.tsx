import React, { useContext } from 'react'

import Current from '../pages/Current'
import Search from '../pages/Search'
import ListC from '../pages/List'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ThemeContext } from 'styled-components'

const Tab = createBottomTabNavigator()

export default function Routes() {
  const { colors } = useContext(ThemeContext)
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.text,
        inactiveTintColor: colors.tabBarIconInactiveColor,
        inactiveBackgroundColor: colors.background,
        activeBackgroundColor: colors.tabBarActiveBackgroundColor,
        style: {
          borderTopWidth: 0,
        },
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Current"
        component={Current}
        options={{
          tabBarLabel: 'Current',
          tabBarIcon: ({ color, size }) => (
            <Icon name="my-location" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="List"
        component={ListC}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({ color, size }) => (
            <Icon name="history" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
