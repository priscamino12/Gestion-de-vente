import { View, TextInput, Text } from 'react-native';
import { COLORS } from '../theme/theme';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  error?: string; // ✅ optionnel
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  error
}) => {
  return (
    <View className="mb-5">
      {label && <Text className="text-text font-medium mb-1.5">{label}</Text>}
      
      <TextInput
        className="bg-card border rounded-2xl px-5 py-4 text-base text-text"
        style={{ borderColor: error ? COLORS.error : COLORS.border }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor={COLORS.textLight}
      />

      {error && <Text className="text-error text-sm mt-1">{error}</Text>}
    </View>
  );
};

export default Input;
