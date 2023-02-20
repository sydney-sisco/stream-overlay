export const Cursor = ({x, y}) => {
  /* a cursor 
  github copilot wrote this entire thing and it worked first try !!! */
  return (
      <div style={{
        position: 'absolute',
        top: y,
        left: x,
        width: 10,
        height: 10,
        backgroundColor: 'red',
        borderRadius: '50%',

        transition: 'all 0.5s ease-in-out',

        // do not block mouse events
        pointerEvents: 'none',
      }} />
  )
};
