// src/screens/agendamiento/JuzgadoScreen.tsx
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PasoIndicador } from '../../components/PasoIndicador';
import { TopBar } from '../../components/TopBar';
import { useJuzgados } from '../../hooks/useJuzgados';
import { AgendamientoStackParamList } from '../../navigation/AgendamientoNavigator';
import { Juzgado } from '../../services/supabase';
import { useAgendamientoStore } from '../../store/agendamiento.store';
import { Colors, Radius, Spacing } from '../../theme/colors';

type Props = { navigation: StackNavigationProp<AgendamientoStackParamList, 'Juzgado'> };

export default function JuzgadoScreen({ navigation }: Props) {
  const { materia, juzgado: seleccionado, setJuzgado } = useAgendamientoStore();
  const { juzgados, loading, error } = useJuzgados(materia?.id ?? null);

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar titulo="Selecciona Juzgado" subtitulo={`Paso 2 de 4 — Materia ${materia?.nombre ?? ''}`} onBack={() => navigation.goBack()} />
      <PasoIndicador paso={2} />
      <ScrollView contentContainerStyle={styles.content}>
        {loading ? <ActivityIndicator color={Colors.primary} style={{ marginTop: 40 }} /> : null}
        {!loading && error ? <EstadoMensaje mensaje={error} /> : null}
        {!loading && !error && juzgados.length === 0 ? <EstadoMensaje mensaje="No hay juzgados disponibles para la materia seleccionada." /> : null}
        {!loading && !error ? (
          juzgados.map(j => <JuzgadoItem key={j.id} juzgado={j} seleccionado={seleccionado?.id === j.id} onPress={() => setJuzgado(j)} />)
        ) : null}
        <TouchableOpacity
          style={[styles.btnNext, !seleccionado && { opacity: 0.4 }]}
          onPress={() => navigation.navigate('FechaHora')}
          disabled={!seleccionado}
        >
          <Text style={styles.btnNextText}>Continuar →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const JuzgadoItem = ({ juzgado, seleccionado, onPress }: { juzgado: Juzgado; seleccionado: boolean; onPress: () => void }) => (
  <TouchableOpacity style={[styles.item, seleccionado && styles.itemSelected]} onPress={onPress} activeOpacity={0.8}>
    <View style={styles.itemIcon}><Text style={{ fontSize: 22 }}>🏛️</Text></View>
    <View style={{ flex: 1 }}>
      <Text style={styles.itemName}>{juzgado.nombre}</Text>
      <Text style={styles.itemLoc}>📍 {juzgado.municipio}{juzgado.direccion ? ` — ${juzgado.direccion}` : ''}</Text>
    </View>
    <View style={[styles.check, seleccionado && styles.checkSelected]}>
      {seleccionado && <Text style={{ color: 'white', fontSize: 13, fontWeight: '700' }}>✓</Text>}
    </View>
  </TouchableOpacity>
);

const EstadoMensaje = ({ mensaje }: { mensaje: string }) => (
  <View style={styles.estadoContenedor}>
    <Text style={styles.estadoTexto}>{mensaje}</Text>
  </View>
);

const styles = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: Colors.primary },
  content:      { padding: Spacing.lg, backgroundColor: Colors.background, flexGrow: 1 },
  estadoContenedor: { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.sm, padding: Spacing.md, marginBottom: Spacing.md },
  estadoTexto:  { fontSize: 13, color: Colors.textSecondary, textAlign: 'center' },
  item:         { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, backgroundColor: Colors.surface, borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.sm, padding: Spacing.md, marginBottom: Spacing.sm },
  itemSelected: { borderColor: Colors.primary, backgroundColor: Colors.primaryPale },
  itemIcon:     { width: 44, height: 44, backgroundColor: Colors.primaryPale, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  itemName:     { fontSize: 13, fontWeight: '600', color: Colors.textPrimary },
  itemLoc:      { fontSize: 11, color: Colors.textSecondary, marginTop: 3 },
  check:        { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  checkSelected:{ backgroundColor: Colors.primary, borderColor: Colors.primary },
  btnNext:      { backgroundColor: Colors.primary, borderRadius: Radius.sm, paddingVertical: 14, alignItems: 'center', marginTop: Spacing.md },
  btnNextText:  { color: Colors.textOnPrimary, fontSize: 15, fontWeight: '700' },
});
