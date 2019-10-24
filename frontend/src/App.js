import React from 'react';
import Board from "./components/Board"

function App() {
  return (
      <Board layout={[[1,2,3], [4, 5, 6], [7, 8, 'O']]}>

      </Board>
  )
}

export default App;
