import { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Socket } from 'socket.io-client';
import { type Message } from '../../../types';

interface ChatProps {
  socket: Socket;
  username: string;
  room: string;
}

export function Chat({ socket, username, room }: ChatProps) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = () => {
    if (currentMessage) {
      const newMessage: Message = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      socket.emit('send_message', newMessage);

      setMessages(message => [...message, newMessage]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (newMessage: Message) => {
      setMessages(message => [
        ...message,
        { ...newMessage, message: newMessage.message },
      ]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <span>Live Chat</span>
        <span>Room: {room}</span>
      </div>

      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messages.map(message => {
            return (
              <div
                className="message"
                key={message.message}
                id={username === message.author ? 'you' : 'other'}
              >
                <div>
                  <div className="message-content">
                    <p>{message.message}</p>
                  </div>

                  <div className="message-meta">
                    <p id="time">{message.time}</p>
                    <p id="author">{message.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>

      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Type your message here"
          onChange={({ target: { value } }) => setCurrentMessage(value)}
          onKeyDown={({ key }) => key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}
