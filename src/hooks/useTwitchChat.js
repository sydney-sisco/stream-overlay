const { useState, useEffect } = require('react');

const useTwitchChat = socket => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('twitch', (data) => {
      setMessages((messages) => {
        return [...messages, data];
      });
    });

    return () => {
      socket.off('twitch');
    }
  }, [socket]);

  return [messages];
}

export default useTwitchChat;
