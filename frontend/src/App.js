import React from 'react';
import Board from "./components/Board"
import InputBoard from "./components/InputBoard"

function App() {
  return (
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: "center", alignItems: "center", height: "100%"}}>
        <InputBoard></InputBoard>
      </div>
  )
}

export default App;
