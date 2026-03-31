import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { COLORS } from '../theme/theme';

const Button = ({
  title,
  onPress,
  loading = false,
  variant = 'primary',
  style = {}
}) => {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      className={`py-4 px-6 rounded-2xl shadow-sm ${isPrimary ? 'bg-primary' : 'bg-gray-200'}`}
      style={style}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? 'white' : COLORS.text} />
      ) : (
        <Text className={`font-semibold text-center text-lg ${isPrimary ? 'text-white' : 'text-text'}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;