import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import SaleItem from '../components/SaleItem';
import Button from "../components/Button";
import { getVentes, deleteVente, getStats } from '../services/api';
import { COLORS } from '../theme/theme';

interface Vente {
  id: number;
  numProduit: string;
  design: string;
  prix: number | string;
  quantite: number;
  createdAt: string;
  montant?: number;
}

interface Stats {
  totalMontant: number;
  montantMinimal: number;
  montantMaximal: number;
  nombreProduits: number;
}

export default function HomeScreen() {
  const router = useRouter();

  const [ventes, setVentes] = useState<Vente[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalMontant: 0,
    montantMinimal: 0,
    montantMaximal: 0,
    nombreProduits: 0,
  });

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setRefreshing(true);

      const [ventesRes, statsRes] = await Promise.all([
        getVentes(),
        getStats()
      ]);

      const ventesWithMontant: Vente[] = ventesRes.data.map((v: Vente) => ({
        ...v,
        montant: Number(v.prix) * v.quantite,
      }));

      setVentes(ventesWithMontant);
      setStats(statsRes.data);

    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Impossible de charger les données.");
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert(
      "Supprimer la vente",
      "Êtes-vous sûr ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteVente(id);
              fetchData();
            } catch {
              Alert.alert("Erreur", "Suppression impossible");
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: Vente }) => (
    <SaleItem
      vente={item}
      onEdit={() =>
        router.push({
          pathname: '/edit-sale/[id]',
          params: { id: item.id.toString() }
        }
        )
      }
      onDelete={() => handleDelete(item.id)}
    />
  );

  const ListHeader = () => (
    <View>
      {/* Header */}
      <View className="bg-primary pt-12 pb-8 px-6 rounded-b-3xl">
        <Text className="text-white text-4xl font-bold">Mes Ventes</Text>
        <Text className="text-white/80 text-lg mt-1">Gestion professionnelle</Text>
      </View>

      {/* Stats */}
      <View className="px-6 -mt-6">
        <View className="bg-card rounded-3xl p-6 shadow-sm border border-border">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-textLight text-sm">TOTAL</Text>
              <Text className="text-4xl font-bold text-primary mt-1">
                {stats.totalMontant.toLocaleString()} Ar
              </Text>
            </View>
            <Ionicons name="cash-outline" size={32} color={COLORS.success} />
          </View>

          <View className="flex-row justify-between">
            <Text>{stats.nombreProduits} produits</Text>
            <Text>Min: {stats.montantMinimal}</Text>
            <Text>Max: {stats.montantMaximal}</Text>
          </View>
        </View>
      </View>

      {/* Bouton */}
      <View className="px-6 mt-6 mb-4">
        <Button
          title="Nouvelle Vente"
          onPress={() => router.push({ pathname: '/add-sale' })}
        />
      </View>

      <Text className="px-6 text-xl font-semibold mb-2">
        Dernières ventes ({ventes.length})
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={ventes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={ListHeader}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={fetchData}
          colors={[COLORS.primary]}
        />
      }
      ListEmptyComponent={
        <View className="p-10 items-center">
          <Text>Aucune vente</Text>
        </View>
      }
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}
