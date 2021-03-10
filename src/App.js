import TodosContainer from "./components/TodosContainer";

const App = () => {
  return (
    <div className="App">
      <div className="bg"></div>
      <header className="pad">
        <div className="container">
          <a href="/" className="logo">
            <h1>todo</h1>
          </a>
          <button className="toggle-theme">
            <img src="./images/icon-sun.svg" alt="light theme" />
          </button>
        </div>
      </header>
      <TodosContainer />
    </div>
  );
};

export default App;
