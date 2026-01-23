import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export function useNotificationCount() {
  const [count, setCount] = useState(0);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io("http://192.168.100.53:8080", {
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to notification socket");
    });

    socketRef.current.on("notification_update", (data) => {
      setCount(data.count);
    });

    socketRef.current.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return count;
}
