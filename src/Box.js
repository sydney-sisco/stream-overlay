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

const doneStyle = {
  color: 'red',
}

export const Box = ({ id, left, top, timerDuration, clear, children }) => {

  const [countdown, setCountdown] = useState();

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult()
        if (item && dropResult.name === 'Dustbin') {
          clear(id);
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top],
  )

  useEffect(() => {
    if (timerDuration) {
      setCountdown(
        <Countdown key={id} date={Date.now() + timerDuration * 60 * 1000} daysInHours >
          <div style={doneStyle}>
            {/* <p>00:00:00:00</p> */}
            <p>done!</p>
          </div>
        </Countdown>
      );
    }

  }, [timerDuration, id]);


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
    </div>
  )
}
