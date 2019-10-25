import React from 'react';
import Board from "./components/Board"
import InputBoard from "./components/InputBoard"

function App() {
  return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <Board layout={[[1,2,3], [4, 5, 6], [7, 8, 'O']]} />
        <Board layout={[[1,2,3], [4, 5, 6], [7, 8, 'O']]} />
        <InputBoard></InputBoard>
      </div>
  )
}

export default App;
