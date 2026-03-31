// src/components/SaleItem.js
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/theme';

const SaleItem = ({ vente, onEdit, onDelete }) => {
  const swipeableRef = useRef(null);
  const montant = Number(vente.prix) * vente.quantite;

  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        onPress={() => {
          onDelete();
          swipeableRef.current?.close();
        }}
        className="justify-center items-center w-24 bg-red-500 rounded-r-3xl"
        activeOpacity={0.8}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <Ionicons name="trash" size={28} color="white" />
          <Text className="text-white text-sm font-medium mt-1">Supprimer</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      rightThreshold={80}
      overshootRight={false}
      onSwipeableOpen={() => {
        // Optionnel : tu peux fermer automatiquement après un délai si tu veux
      }}
    >
      <View className="bg-card p-5 rounded-3xl mb-4 shadow-sm border border-border overflow-hidden">
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="font-semibold text-xl text-text">{vente.design}</Text>
            <Text className="text-textLight mt-0.5">N° {vente.numProduit}</Text>
          </View>
          <Text className="text-2xl font-bold text-primary">
            {montant.toLocaleString()} Ar
          </Text>
        </View>

        <View className="flex-row mt-4">
          <Text className="text-textLight">Quantité : </Text>
          <Text className="font-medium text-text">{vente.quantite}</Text>

          <Text className="mx-3 text-border">•</Text>

          <Text className="text-textLight">Prix unitaire : </Text>
          <Text className="font-medium text-text">
            {Number(vente.prix).toLocaleString()} Ar
          </Text>
        </View>

        {/* Boutons édition (visibles sans swipe) */}
        <View className="flex-row justify-end mt-5 gap-5">
          <TouchableOpacity onPress={onEdit} className="p-3">
            <Ionicons name="create-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onDelete} className="p-3">
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );
};

export default SaleItem;