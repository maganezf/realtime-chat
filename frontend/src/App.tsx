import { useState } from 'react';
import { io } from 'socket.io-client';
import { Chat } from './components/Chat';
import { JoinChat } from './components/JoinChat';
import './styles/global.scss';

const socket = io('http://localhost:3333');

export function App() {
	const [showChat, setShowChat] = useState(false);
	const [username, setUsername] = useState('');
	const [room, setRoom] = useState('');

	return (
		<main className="app">
			{showChat ? (
				<Chat socket={socket} username={username} room={room} />
			) : (
				<JoinChat
					socket={socket}
					username={{ value: username, setValue: setUsername }}
					room={{ value: room, setValue: setRoom }}
					setShowChat={setShowChat}
				/>
			)}
		</main>
	);
}
