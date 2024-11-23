import { useEffect, useState } from "react";
import { config } from "@/lib/config";

export function useWebSocket(path: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`${config.wsUrl}${path}`);
    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [path]);

  return socket;
}
