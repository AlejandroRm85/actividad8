// src/hooks/useJuzgados.ts
import { useEffect, useState } from 'react';
import { getJuzgadosPorMateria } from '../services/juzgados.service';
import { Juzgado } from '../services/supabase';

export const useJuzgados = (materiaId: number | null) => {
  const [juzgados, setJuzgados] = useState<Juzgado[]>([]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  useEffect(() => {
    if (!materiaId) {
      setJuzgados([]);
      setError(null);
      setLoading(false);
      return;
    }

    const cargar = async () => {
      try {
        setLoading(true);
        setError(null);
        const datos = await getJuzgadosPorMateria(materiaId);
        setJuzgados(datos);
      } catch (e: any) {
        setError(e.message ?? 'Error al cargar juzgados');
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [materiaId]);

  return { juzgados, loading, error };
};
