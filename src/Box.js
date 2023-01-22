import { useState, useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'

const style = {
  position: 'absolute',
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
}

export const Box = ({ id, left, top, timerDuration, children }) => {

  const [timer, setTimer] = useState(timerDuration);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  )

//   var start = Date.now();
//   setInterval(function () {
//     var delta = Date.now() - start; // milliseconds elapsed since start
//     …
// output(Math.floor(delta / 1000)); // in seconds
// // alternatively just show wall clock time:
// output(new Date().toUTCString());
// }, 1000); // update about every second

  useEffect(() => {

    const start = Date.now();

    const interval = setInterval(() => {
      const delta = Date.now() - start; // milliseconds elapsed since start
      console.log(Math.floor(delta / 1000)); // in seconds
      // console.log(new Date().toUTCString()); // wall clock time
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isDragging) {
    return <div ref={drag} />
  }

  return (
    <div
      className="box"
      ref={drag}
      style={{ ...style, left, top }}
      data-testid="box"
    >
      {children} {}
    </div>
  )
}
