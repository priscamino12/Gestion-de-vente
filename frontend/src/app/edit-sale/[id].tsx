// src/app/edit-sale/[id].tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { getVentes, updateVente } from '../../services/api';   // On va récupérer la vente par ID
import { COLORS } from '../../theme/theme';

export default function EditSaleScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [form, setForm] = useState({
    numProduit: '',
    design: '',
    prix: '',
    quantite: '',
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Charger les données de la vente
  useEffect(() => {
    const loadSale = async () => {
      try {
        const response = await getVentes();
        const sale = response.data.find((v: any) => v.id === parseInt(id!));

        if (sale) {
          setForm({
            numProduit: sale.numProduit,
            design: sale.design,
            prix: sale.prix.toString(),
            quantite: sale.quantite.toString(),
          });
        }
      } catch (error) {
        Alert.alert("Erreur", "Impossible de charger la vente");
      } finally {
        setInitialLoading(false);
      }
    };

    if (id) loadSale();
  }, [id]);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.numProduit || !form.design || !form.prix || !form.quantite) {
      Alert.alert("Champs requis", "Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);

    try {
      await updateVente(parseInt(id!), {
        numProduit: form.numProduit.trim(),
        design: form.design.trim(),
        prix: parseFloat(form.prix),
        quantite: parseInt(form.quantite),
      });

      Alert.alert("Succès", "Vente modifiée avec succès !", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Impossible de modifier la vente.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <Text>Chargement de la vente...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="bg-primary pt-14 pb-10 px-6 rounded-b-3xl">
          <View className="flex-row items-center">
            <Ionicons name="create" size={32} color="white" />
            <Text className="text-white text-3xl font-bold ml-3">Modifier la Vente</Text>
          </View>
        </View>

        <View className="px-6 -mt-6">
          <View className="bg-card rounded-3xl p-8 shadow-sm border border-border">
            
            <Input
              label="Numéro du Produit"
              placeholder="Ex: P00123"
              value={form.numProduit}
              onChangeText={(text) => handleChange('numProduit', text)}
            />

            <Input
              label="Désignation"
              placeholder="Ex: Ordinateur Portable Dell"
              value={form.design}
              onChangeText={(text) => handleChange('design', text)}
            />

            <Input
              label="Prix Unitaire (Ar)"
              placeholder="Ex: 450000"
              value={form.prix}
              onChangeText={(text) => handleChange('prix', text)}
              keyboardType="numeric"
            />

            <Input
              label="Quantité"
              placeholder="Ex: 5"
              value={form.quantite}
              onChangeText={(text) => handleChange('quantite', text)}
              keyboardType="numeric"
            />

            <Button
              title="Enregistrer les modifications"
              onPress={handleSubmit}
              loading={loading}
              variant="primary"
              style={{ marginTop: 24 }}
            />

            <Button
              title="Annuler"
              onPress={() => router.back()}
              variant="secondary"
              style={{ marginTop: 12 }}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}