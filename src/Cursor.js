// colors
const PURPLE = '#9400d3';
const INDIGO = '#4b0082';
const BLUE = '#0000ff';
const GREEN = '#00ff00';
const YELLOW = '#ffff00';
const ORANGE = '#ff7f00';
const RED = '#ff0000';

const colors = [
  PURPLE,
  INDIGO,
  BLUE,
  GREEN,
  YELLOW,
  ORANGE,
  RED,
];

export const Cursor = ({x, y, color}) => {
  /* a cursor 
  github copilot wrote this entire thing and it worked first try !!! */

  console.log('rendering cursor', x, y, color);
  return (
      <div style={{
        position: 'absolute',
        top: y,
        left: x,
        width: 10,
        height: 10,
        backgroundColor: colors[color],
        borderRadius: '50%',

        // transition: 'all 0.25s linear',

        // do not block mouse events
        pointerEvents: 'none',
      }} />
  )
};
