import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello from V2</h1>
        <form>
          <input type="text" placeholder="-> email"></input>
          <input type="button" value="get access"></input>
        </form>
      </header>
    </div>
  );
}

export default App;
