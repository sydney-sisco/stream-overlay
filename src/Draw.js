import { useState, useContext, useEffect } from 'react'
import { SocketContext } from './context/socket';
import _ from 'lodash'

const style = {
  position: 'absolute',
  top: 0,
  height: '100vh',
  width: '100vw',
  // border: '1px solid black',
};

export const Draw = () => {
  const socket = useContext(SocketContext);

  const [cursor, setCursor] = useState({ x: 0, y: 0 });


  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    socket.emit('cursor', { x: clientX, y: clientY });
  };

  useEffect(() => {
    socket.on('cursor', (data) => {
      setCursor(data);
    });

    return () => {
      socket.off('cursor');
    }
  }, []);

  return (
    <div style={style} onMouseMove={_.throttle(handleMouseMove, 250)} >
      {/* {cursor.x}, {cursor.y} */}

      {/* a cursor */}
      {/* github copilot wrote this entire thing and it worked first try !!! */}
      <div style={{
        position: 'absolute',
        top: cursor.y,
        left: cursor.x,
        width: 10,
        height: 10,
        backgroundColor: 'red',
        borderRadius: '50%',

        transition: 'all 0.5s ease-in-out',

        // do not block mouse events
        pointerEvents: 'none',


      }} />

    </div>
  )
};
