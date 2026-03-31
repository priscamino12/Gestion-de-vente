import { Stack } from "expo-router";
import "../../global.css";           // ← Import obligatoire du CSS
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack 
        screenOptions={{
          headerStyle: { backgroundColor: '#10b981' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ title: "Mes Ventes", headerShown: true }} 
        />
      </Stack>
    </GestureHandlerRootView>
  );
}