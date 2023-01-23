import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'

const style = {
  height: '50px',
  width: '300px',
  color: 'white',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
}

export const Dustbin = () => {

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = canDrop && isOver

  let backgroundColor = '#606060'

  if (isActive) {
    backgroundColor = 'red'
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor }} data-testid="dustbin">
      {isActive ? 'Release to delete' : 'Drag a box here to delete'}
    </div>
  )
}
