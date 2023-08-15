import { Dispatch, SetStateAction } from 'react';
import { Socket } from 'socket.io-client';
import type { State } from '../types';

interface JoinChatProps {
  socket: Socket;
  username: State;
  room: State;
  setShowChat: Dispatch<SetStateAction<boolean>>;
}

export function JoinChat({
  socket,
  username,
  room,
  setShowChat,
}: JoinChatProps) {
  const joinRoom = () => {
    if (username.value && room.value) {
      socket.emit('join_room', { room: room.value, user: username.value });
      setShowChat(true);
    }
  };

  return (
    <div className="join-chat">
      <h3>Join in the chat</h3>

      <input
        type="text"
        placeholder="Type your name here"
        onChange={({ target: { value } }) => username.setValue(value)}
      />

      <input
        type="text"
        placeholder="Type your room id here"
        onChange={({ target: { value } }) => room.setValue(value)}
      />

      <button onClick={joinRoom} disabled={!username.value || !room.value}>
        Join in the room
      </button>
    </div>
  );
}
