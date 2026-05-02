// src/navigation/AgendamientoNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MateriaScreen      from '../screens/agendamiento/MateriaScreen';
import JuzgadoScreen      from '../screens/agendamiento/JuzgadoScreen';
import FechaHoraScreen    from '../screens/agendamiento/FechaHoraScreen';
import ConfirmacionScreen from '../screens/agendamiento/ConfirmacionScreen';
import TicketScreen       from '../screens/agendamiento/TicketScreen';

export type AgendamientoStackParamList = {
  Materia:      undefined;
  Juzgado:      undefined;
  FechaHora:    undefined;
  Confirmacion: undefined;
  Ticket:       { citaId: string };
};

const Stack = createStackNavigator<AgendamientoStackParamList>();

export const AgendamientoNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Materia"      component={MateriaScreen} />
    <Stack.Screen name="Juzgado"      component={JuzgadoScreen} />
    <Stack.Screen name="FechaHora"    component={FechaHoraScreen} />
    <Stack.Screen name="Confirmacion" component={ConfirmacionScreen} />
    <Stack.Screen name="Ticket"       component={TicketScreen} />
  </Stack.Navigator>
);
