import { ReactNode, createContext, useMemo, useContext } from "react";
import { Socket, io } from "socket.io-client";

type SocketContextType = {
  socket: Socket;
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket?.socket;
};

export const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
  const socket = useMemo(() => io("localhost:8000"), []);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
