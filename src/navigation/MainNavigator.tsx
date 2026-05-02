// src/navigation/MainNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import HistorialScreen from '../screens/historial/HistorialScreen';
import PerfilScreen    from '../screens/perfil/PerfilScreen';
import { Colors } from '../theme/colors';

export type MainTabParamList = {
  Dashboard: undefined;
  Historial: undefined;
  Perfil:    undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const icon = (emoji: string, focused: boolean) => (
  <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>{emoji}</Text>
);

export const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor:   Colors.primary,
      tabBarInactiveTintColor: Colors.textMuted,
      tabBarStyle: {
        borderTopWidth: 0.5,
        borderTopColor: Colors.border,
        height: 72,
        paddingBottom: 12,
        paddingTop: 8,
      },
      tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
    }}
  >
    <Tab.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{ tabBarLabel: 'Inicio', tabBarIcon: ({ focused }) => icon('🏠', focused) }}
    />
    <Tab.Screen
      name="Historial"
      component={HistorialScreen}
      options={{ tabBarLabel: 'Historial', tabBarIcon: ({ focused }) => icon('📋', focused) }}
    />
    <Tab.Screen
      name="Perfil"
      component={PerfilScreen}
      options={{ tabBarLabel: 'Perfil', tabBarIcon: ({ focused }) => icon('👤', focused) }}
    />
  </Tab.Navigator>
);
