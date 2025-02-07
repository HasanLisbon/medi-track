import { Stack } from "expo-router";
import "../global.css";
import { ToastProvider } from "react-native-toast-notifications";

export default function RootLayout() {
  return (
    <ToastProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(login)" />
        <Stack.Screen name="action-modal" options={{ presentation: "modal" }} />
      </Stack>
    </ToastProvider>
  );
}
