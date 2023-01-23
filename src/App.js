import './App.css';
import { Container } from './Container.js'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { SocketContext, socket } from './context/socket.js';


function App() {
  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <DndProvider backend={HTML5Backend}>
          <Container />
        </DndProvider>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
