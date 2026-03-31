// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, Alert } from 'react-native';
import { getVentes, deleteVente, getStats } from '../services/api';
import SaleItem from '../components/SaleItem';
import Button from '../components/Button';
import { COLORS } from '../theme/theme';

const HomeScreen = ({ navigation }) => {
  const [ventes, setVentes] = useState([]);
  const [stats, setStats] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const [ventesRes, statsRes] = await Promise.all([getVentes(), getStats()]);
      setVentes(ventesRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error(err);
      Alert.alert('Erreur', 'Impossible de charger les données');
    }
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    Alert.alert('Supprimer', 'Voulez-vous vraiment supprimer cette vente ?', [
      { text: 'Annuler' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: async () => {
          await deleteVente(id);
          fetchData();
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <SaleItem
      vente={item}
      onEdit={() => navigation.navigate('EditSale', { vente: item })}
      onDelete={() => handleDelete(item.id)}
    />
  );

  return (
    <View className="flex-1 bg-background pt-12 px-5">
      {/* Header */}
      <Text className="text-4xl font-bold text-text mb-2">Mes Ventes</Text>
      <Text className="text-textLight mb-8">Gestion simple et élégante</Text>

      {/* Stats Cards */}
      <View className="flex-row justify-between mb-8">
        <View className="bg-card p-5 rounded-3xl flex-1 mr-3 shadow-sm">
          <Text className="text-success text-sm">Total</Text>
          <Text className="text-3xl font-bold text-text">{stats.totalMontant?.toLocaleString()} Ar</Text>
        </View>
        <View className="bg-card p-5 rounded-3xl flex-1 shadow-sm">
          <Text className="text-textLight text-sm">Produits</Text>
          <Text className="text-3xl font-bold text-text">{stats.nombreProduits}</Text>
        </View>
      </View>

      <Button title="Nouvelle Vente" onPress={() => navigation.navigate('AddSale')} />

      <FlatList
        data={ventes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchData} colors={[COLORS.primary]} />}
        showsVerticalScrollIndicator={false}
        className="mt-6"
      />
    </View>
  );
};

export default HomeScreen;