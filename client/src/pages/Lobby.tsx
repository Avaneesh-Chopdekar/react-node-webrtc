import {
  CSSProperties,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";

export default function Lobby() {
  const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  const socket = useSocket();
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      console.log({ email, roomId });
      socket?.emit("room:join", { email, roomId });
    },
    [email, roomId, socket]
  );

  const handleJoinRoom = useCallback(
    (data: { email: string; roomId: string }) => {
      const { roomId } = data;
      navigate(`/room/${roomId}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket?.on("room:join", handleJoinRoom);
    return () => {
      socket?.off("room:join", handleJoinRoom);
    };
  }, [handleJoinRoom, socket]);

  return (
    <>
      <h1 style={titleStyles}>Lobby</h1>
      <form style={formStyles} onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          style={inputStyles}
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="room">Room ID</label>
        <input
          style={inputStyles}
          type="text"
          name="room"
          id="room"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          required
        />
        <button style={btnStyles} type="submit">
          Join
        </button>
      </form>
    </>
  );
}

const titleStyles: CSSProperties = {
  textAlign: "center",
  margin: "2rem 0",
};

const formStyles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
};

const inputStyles: CSSProperties = {
  padding: "0.5rem",
};

const btnStyles: CSSProperties = {
  padding: "0.5rem 2rem",
  cursor: "pointer",
};
