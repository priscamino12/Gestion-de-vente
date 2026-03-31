// src/app/add-sale.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Input from '../components/Input';
import Button from '../components/Button';
import { addVente } from '../services/api';
import { COLORS } from '../theme/theme';

export default function AddSaleScreen() {
  const router = useRouter();

  const [form, setForm] = useState({
    numProduit: '',
    design: '',
    prix: '',
    quantite: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const { numProduit, design, prix, quantite } = form;

    if (!numProduit || !design || !prix || !quantite) {
      Alert.alert("Champs requis", "Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);

    try {
      await addVente({
        numProduit: numProduit.trim(),
        design: design.trim(),
        prix: parseFloat(prix),
        quantite: parseInt(quantite),
      });

      Alert.alert("Succès", "Vente ajoutée avec succès !", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Impossible d'ajouter la vente. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  };

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
        {/* Header */}
        <View className="bg-primary pt-14 pb-10 px-6 rounded-b-3xl">
          <View className="flex-row items-center">
            <Ionicons name="add-circle" size={32} color="white" />
            <Text className="text-white text-3xl font-bold ml-3">Nouvelle Vente</Text>
          </View>
          <Text className="text-white/80 mt-2 text-lg">Enregistrez une nouvelle transaction</Text>
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
              title="Enregistrer la Vente"
              onPress={handleSubmit}
              loading={loading}
              variant="primary"
              style={{ marginTop: 20 }}
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