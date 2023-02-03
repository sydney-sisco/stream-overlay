import { useState, useContext, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { Box } from './Box.js'
import { ItemTypes } from './ItemTypes.js'
import { Dustbin } from './Dustbin.js'
import randomEmoji from './random-emoji.js'
import { SocketContext } from './context/socket';
import { v4 as uuidv4 } from 'uuid';


const styles = {
  width: '100vw',
  height: '100vh',
  border: '1px solid black',
  position: 'relative',

  display: 'flex',
  justifyContent: 'center',
}

export const Container = () => {
  const socket = useContext(SocketContext);

  // input fields
  const [label, setLabel] = useState('');
  const [timerDuration, setTimerDuration] = useState('');

  // array of timers/labels
  const [boxes, setBoxes] = useState({
    // '🍕': {
    //   top: 100,
    //   left: 100,
    //   title: '🍕',
    //   timerDuration: 10
    // },
    // '🍔': {
    //   top: 250,
    //   left: 100,
    //   title: '🍔',
    //   timerDuration: 0.5
    // },
    // '🍟': {
    //   top: 400,
    //   left: 100,
    //   title: '🍟',
    //   timerDuration: 0.1
    // },
    '0': {
      top: 60,
      left: 0,
      title: '↘️',
    },
    '1': {
      top: 60,
      left: 640,
      title: '↙️',
    },
    '2': {
      top: 480,
      left: 0,
      title: '↗️',
    },
    '3': {
      top: 480,
      left: 640,
      title: '↖️',
    },
  })

  useEffect(() => {
    socket.on("moveBox", ({ id, left, top }) => {
      setBoxes((boxes) => {
        return {
          ...boxes,
          [id]: {
            ...boxes[id],
            left,
            top
          }
        }
      })
    });

    socket.on("addBox", ({ key, title, timerDuration }) => {
      setBoxes((boxes) => {
        return {
          ...boxes,
          [key]: {
            top: 50,
            left: 400,
            title: title,
            timerDuration: timerDuration ? timerDuration : null
          }
        }
      })
    });

    socket.on("deleteBox", ({key}) => {
      setBoxes((boxes) => {
        const newBoxes = { ...boxes };
        delete newBoxes[key];
        return newBoxes;
      })
    });

    return () => {
      socket.off("moveBox");
      socket.off("addBox");
      socket.off("deleteBox");
    }
  }, []);

  const moveBox = (id, left, top) => {
    // send the new position to the server
    socket.emit('moveBox', {id, left, top});

    setBoxes((boxes) => {
      return {
        ...boxes,
        [id]: {
          ...boxes[id],
          left,
          top
        }
      }
    })
  };

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset()
        
        if (!delta) {
          return undefined
        }
        
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y)
        moveBox(item.id, left, top)
        return undefined
      },
    }),
    [moveBox],
  );

  const addItem = () => {
    const key = uuidv4();
    const title = label ? label : randomEmoji();

    // send the new box to the server
    socket.emit('addBox', {key, title, timerDuration});

    setBoxes((boxes) => {
      return {
        ...boxes,
        [key]: {
          top: 50,
          left: 400,
          title: title,
          timerDuration: timerDuration ? timerDuration : null
        }
      }
    });
    
    // clear the input fields
    setLabel('')
    setTimerDuration('');
  };

  const deleteItem = (key) => setBoxes((boxes) => {

    // send the delete to the server
    socket.emit('deleteBox', {key});

    delete boxes[key];
    const newBoxes = { ...boxes };
    return newBoxes;
  });
  
  
  return (
    <div ref={drop} style={styles}>

      <Dustbin />

      <div>
        <button onClick={() => setBoxes([])}>Clear</button>
        {' '}
        <button onClick={addItem}>Add</button>
        {' '}
        
        <Input
          label="Label: "
          value={label}
          onChange={e => setLabel(e.target.value)}
        />

        <Input
          label="Timer duration (minutes): "
          value={timerDuration}
          onChange={e => setTimerDuration(e.target.value)}
        />
      </div>

      {Object.keys(boxes).map((key) => {
        const { left, top, title, timerDuration } = boxes[key]
        return (
          <Box
            key={key}
            id={key}
            left={left}
            top={top}
            timerDuration={timerDuration}
            clear={()=>deleteItem(key)}
          >
            {title}
          </Box>
        )
      })}
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
