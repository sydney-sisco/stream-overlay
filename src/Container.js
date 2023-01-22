import update from 'immutability-helper'
import { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { Box } from './Box.js'
import { ItemTypes } from './ItemTypes.js'
import { Dustbin } from './Dustbin.js'
import randomEmoji from './random-emoji.js'

const styles = {
  width: '100vw',
  height: '100vh',
  border: '1px solid black',
  position: 'relative',
}

export const Container = () => {

  const [label, setLabel] = useState('');
  const [timerDuration, setTimerDuration] = useState();

  // function handleChange(e) {
  //   setLabel(e.target.value);
  // }

  const [boxes, setBoxes] = useState([
    { top: 20, left: 80, title: 'Drag me around' },
    { top: 180, left: 20, title: 'Drag me too' },
  ])

  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        }),
      )
    },
    [boxes, setBoxes],
  )

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset()
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y)
        moveBox(item.id, left, top)
        return undefined
      },
    }),
    [moveBox],
  )

  const addItem = () => {
    
    setBoxes([
      ...boxes, 
      { top: 20, left: 200, title: label ? label : randomEmoji() }
    ]);
    
    // clear the input fields
    setLabel('')
    setTimerDuration();
  }

  
  return (
    <div ref={drop} style={styles}>
      <button onClick={() => setBoxes([])}>Clear</button>
      <button onClick={addItem}>Add</button>
      
      <Input
        label="Label: "
        value={label}
        onChange={e => setLabel(e.target.value)}
      />

      <Input
        label="Timer duration: "
        value={timerDuration}
        onChange={e => setTimerDuration(e.target.value)}
      />

      {boxes.map(({ top, left, title }, key) => {
        return (
          <Box
            key={key}
            id={key}
            left={left}
            top={top}
            hideSourceOnDrag
          >
            {title}
          </Box>
        )
      })}
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Dustbin />
      </div>
    </div>
  )
}

function Input({ label, value, onChange }) {
  return (
    <label>
      {label}
      {' '}
      <input
        value={value}
        onChange={onChange}
      />
    </label>
  );
}