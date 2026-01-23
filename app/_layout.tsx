import { AuthProvider } from "@/contexts/auth-context";
import AppLayout from "./app_layout";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}
