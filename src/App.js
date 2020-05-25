// @flow strict
import React from "react";
import "./App.css";

import type { Element } from "react";

function App(): Element<"div"> {
  const helloWorld: string = "Welcome to the Road to learn React";
  return (
    <div className="App">
      <h2>{helloWorld}</h2>
    </div>
  );
}

export default App;
