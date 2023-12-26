import { useState, useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr"; // ou a biblioteca de SignalR que você está utilizando
import { toast } from "react-toastify";

const useSignalRConnection = (token: string | null) => {
  const connection = useRef<null | signalR.HubConnection>(null);
  const [notificationNumber, setNotificationNumber] = useState<number>(0);
  const [notifications, setNotifications] = useState<string[] | []>([]);

  const handleConnectionError = (error: Error) => {
    // Aqui você pode adicionar lógica para exibir o erro de acordo com a sua preferência
    toast.error(`Erro ao iniciar a conexão com o SignalR: ${error.message}`);
  };

  useEffect(() => {
    const startConnection = async () => {
      try {
        if (token) {
          connection.current = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7238/notificationHub", {
              skipNegotiation: true,
              transport: signalR.HttpTransportType.WebSockets,
              accessTokenFactory: async () => token,
            })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Warning) // Configuração do nível de log para Warning
            .build();

          connection.current.on("OrderNotification", (message) => {
            setNotificationNumber(
              (prevNotificationNumber) => prevNotificationNumber + 1
            );
            setNotifications((prevNotifications) => [
              ...prevNotifications,
              message,
            ]);
          });

          await connection.current.start();
        }
      } catch (error) {
        handleConnectionError(error as Error);
      }
    };

    startConnection();

    return () => {
      if (
        connection.current &&
        connection.current.state === signalR.HubConnectionState.Connected
      ) {
        connection.current.stop();
        connection.current = null;
      }
    };
  }, [token]);

  return { notificationNumber, notifications };
};

export default useSignalRConnection;
