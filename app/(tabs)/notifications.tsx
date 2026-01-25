import { notifications_samples } from "@/assets/samples/noti_samples";
import { Header } from "@/components/header";
import NotificationItem from "@/components/notification";
import { useNotification } from "@/contexts/notifications-context";
import { SafeAreaView } from "react-native-safe-area-context";


function Notification() {
  const { clearNotification } = useNotification();

  return (
    <SafeAreaView>
      {Header('Notifications')}
      {notifications_samples.map((noti)=>{
        return <NotificationItem key={noti.notification_id} notification={noti}/>
      })}
    </SafeAreaView>
  )
}

export default Notification;