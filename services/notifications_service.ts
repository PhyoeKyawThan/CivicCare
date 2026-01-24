// import * as Notifications from 'expo-notifications';
// import { useEffect, useRef, useState } from "react";
// import { io, Socket } from "socket.io-client";

// export function useNotificationCount() {
//   const [count, setCount] = useState(0);
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     socketRef.current = io("http://192.168.100.49:8080", {
//       transports: ["websocket"],
//       autoConnect: true,
//     });

//     socketRef.current.on("connect", () => {
//       console.log("Connected to notification socket");
//     });

//     socketRef.current.on("notification_update", async (data) => {
//       setCount(data.count);
//       console.log(data.count);
//       await Notifications.scheduleNotificationAsync({
//         trigger: null,
//           content: {
//             title: "Notification alert",
//             body: `You have ${data.count} new notifications.`,
//             badge: data.count,
//             data: {
//               count: data.count
//             },
//           }
//         })
//     });

//     socketRef.current.on("disconnect", () => {
//       console.log("Socket disconnected");
//     });

//     return () => {
//       socketRef.current?.disconnect();
//     };
//   }, []);

//   const clearNotification = ()=>{
//     setCount(0);
//   }

//   return {
//     clearNotification, 
//     count
//   };
// }
