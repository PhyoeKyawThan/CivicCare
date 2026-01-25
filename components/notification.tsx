import { NotificationType } from "@/constants/notification";
import { View } from "react-native";

interface NotificationProps{
    notification: NotificationType
}

export default function NotificationItem ({notification}: NotificationProps){
    return (
    <View>
        {/* <Image src={notification.}/> */}
    </View>
    );
}