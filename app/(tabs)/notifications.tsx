import { useNotification } from "@/contexts/notifications-context";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Notification() {
  const { clearNotification } = useNotification();
  
  return (
    <SafeAreaView>
      <Button onPress={() => clearNotification("123123")} title="Clear notification"/>
    </SafeAreaView>
  )
}

export default Notification;