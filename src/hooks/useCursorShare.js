const { useState, useEffect } = require('react');
const _ = require('lodash');

const useCursorShare = socket => {
  const [cursor, setCursor] = useState(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    socket.emit('cursor', { x: clientX, y: clientY });
  };

  const throttledHandleMouseMove = _.throttle(handleMouseMove, 250);

  useEffect(() => {
    socket.on('cursor', (data) => {
      setCursor(data);
    });

    return () => {
      socket.off('cursor');
    }
  }, []);

  return [cursor, throttledHandleMouseMove];
}

export default useCursorShare;
