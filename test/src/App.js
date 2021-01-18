import { useState, useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import test from './testClass.js';
import WasmTest from './WasmTest.jsx';

/*
to COMPILE run:
`emcc 145.c -Os -s WASM=1 -s SIDE_MODULE=1 -o test.wasm`
*/

function App() {
  const a = new test("brene");
  const [b, incB] = useReducer(pB => pB + 1, 0);

  return (
    <div className="App">
    <WasmTest />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => incB()}>A</button>
        <p>
          Edit <code>src/App.js</code> and save to reload. {b}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
