import React from "react";
import "./App.css";
import 'reactflow/dist/style.css';
import FlowBuilder from "./components/FlowBuilder";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatbot Flow Builder</h1>
      </header>
      <main>
        <FlowBuilder />
      </main>
    </div>
  );
};

export default App;
