import { useState } from "react";
import TodosContainer from "./components/TodosContainer";

const App = () => {
  const [lightTheme, setLightTheme] = useState(false);

  return (
    <div className={lightTheme ? "App light" : "App"}>
      <div className="bg"></div>
      <header className="pad">
        <div className="container">
          <a href="/" className="logo">
            <h1>todo</h1>
          </a>
          <button
            className="toggle-theme"
            onClick={() => setLightTheme(!lightTheme)}
          >
            <img
              src={
                lightTheme ? "./images/icon-moon.svg" : "./images/icon-sun.svg"
              }
              alt="light theme"
            />
          </button>
        </div>
      </header>
      <TodosContainer />
    </div>
  );
};

export default App;
