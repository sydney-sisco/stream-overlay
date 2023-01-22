import { useState, useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'
import Countdown from 'react-countdown';

const style = {
  position: 'absolute',
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
}

export const Box = ({ id, left, top, timerDuration, children }) => {

  const [timer, setTimer] = useState(timerDuration);
  const [countdown, setCountdown] = useState();

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

  useEffect(() => {
    // Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
    if (timerDuration) {
      setCountdown(<Countdown key={id} date={Date.now() + timerDuration * 60 * 1000} />);
    }

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
      {children}
      <br />
      {countdown}
      {/* <Countdown key={id} date={Date.now() + timerDuration * 60 * 1000} /> */}
    </div>
  )
}
