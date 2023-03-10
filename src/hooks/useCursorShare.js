const { useState, useEffect } = require('react');
const _ = require('lodash');

const useCursorShare = socket => {
  const [cursors, setCursor] = useState([]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    // console.log('mouse move', e)
    socket.emit('cursor', { x: clientX, y: clientY });
  };

  const throttledHandleMouseMove = _.throttle(handleMouseMove, 250);

  useEffect(() => {
    socket.on('cursor', (data) => {
      // update the cursor state
      // find the cursor with the matching id
      // update the cursor with the new data
      setCursor((cursor) => {
        const index = cursor.findIndex(c => c.id === data.id);
        if (index === -1) {
          return [...cursor, data];
        } else {
          const newCursor = [...cursor];
          newCursor[index] = data;
          return newCursor;
        }
      });
    });

    return () => {
      socket.off('cursor');
    }
  }, []);

  return [cursors, throttledHandleMouseMove];
}

export default useCursorShare;
