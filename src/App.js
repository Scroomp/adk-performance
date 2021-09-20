import "./App.css";
import React from "react";

function App() {
  const [numbher, setNumbher] = React.useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <p>ADK Performance</p>
        <button onClick={() => setNumbher(numbher + 1)}>click me</button>
        <h2>{numbher}</h2>
      </header>
    </div>
  );
}

export default App;
