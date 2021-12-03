import { useState, useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import test from './testClass.js';
import WasmTest from './WasmTest.jsx';
import { useContextMenu } from "./hooks/useContextMenu";

import MenuItem from '@mui/material/MenuItem';

/*
to COMPILE run:
`emcc 145.c -Os -s WASM=1 -s SIDE_MODULE=1 -o test.wasm`
*/

function App() {
  const a = new test("brene");
  const [b, incB] = useReducer(pB => pB + 1, 0);
  // const [Menu, setMenu] = useState(null);
  const { ContextMenu, setOpen } = useContextMenu(
    [
      <MenuItem onClick={(e) => console.log("Copy")}>Copy</MenuItem>,
      <MenuItem onClick={(e) => console.log("Print")}>Print</MenuItem>,
      <MenuItem onClick={(e) => console.log("Highlight")}>Highlight</MenuItem>,
      <MenuItem onClick={(e) => console.log("Email")}>Email</MenuItem>,
    ]
  );
  // console.log(Menu)
  console.log(ContextMenu)
  return (
    <div className="App">
    <WasmTest />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onContextMenu={(evt) => setOpen(evt)} onClick={() => incB()}>A</button>
        <p>
          Edit <code>src/App.js</code> and save to reload. {b}
        </p>
      </header>
      <ContextMenu />
    </div>
  );
}

export default App;
