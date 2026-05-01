import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ROUTES } from '../config';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import InstitutionScreen from '../screens/InstitutionScreen';
import EventsScreen from '../screens/EventsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case ROUTES.MAIN.MAIN:
              iconName = focused ? 'home' : 'home';
              break;
            case ROUTES.MAIN.INSTITUTION_DETAILS:
              iconName = focused ? 'building' : 'building';
              break;
            case ROUTES.MAIN.EVENTS:
              iconName = focused ? 'calendar' : 'calendar';
              break;
            case ROUTES.MAIN.PROFILE:
              iconName = focused ? 'user' : 'user';
              break;
            default:
              iconName = 'circle';
          }

          return (
            <View style={[
              styles.iconContainer,
              focused && styles.iconContainerFocused
            ]}>
              <Icon 
                name={iconName} 
                size={focused ? 24 : 22} 
                color={focused ? '#fff' : '#8B8B8B'} 
              />
            </View>
          );
        },
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: '#1BB161',
        tabBarInactiveTintColor: '#8B8B8B',
        tabBarShowLabel: true,
      })}
    >
      <Tab.Screen 
        name={ROUTES.MAIN.MAIN} 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name={ROUTES.MAIN.INSTITUTION_DETAILS} 
        component={InstitutionScreen}
        options={{
          tabBarLabel: 'Institutions',
        }}
      />
      <Tab.Screen 
        name={ROUTES.MAIN.EVENTS} 
        component={EventsScreen}
        options={{
          tabBarLabel: 'Events',
        }}
      />
      <Tab.Screen 
        name={ROUTES.MAIN.PROFILE} 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 25,
    borderTopWidth: 0,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 2,
  },
  iconContainerFocused: {
    backgroundColor: '#1BB161',
    shadowColor: '#1BB161',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
});

export default TabNavigator;
