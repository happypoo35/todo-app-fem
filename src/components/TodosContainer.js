import { useEffect, useState } from "react";
import data from "../data";
import Todo from "./Todo";
import Filters from "./Filters";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const TodosContainer = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [left, setLeft] = useState(null);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("all");
  const [size, setSize] = useState(window.innerWidth);

  const checkSize = () => {
    setSize(window.innerWidth);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "") return;
    setTodos([
      ...todos,
      { id: new Date().getTime().toString(), text: text, isCompleted: false },
    ]);
    setText("");
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter((el) => el.isCompleted === false));
  };

  useEffect(() => {
    setTodos(data);
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  useEffect(() => {
    const handleFilter = () => {
      switch (status) {
        case "completed":
          setFilteredTodos(todos.filter((el) => el.isCompleted === true));
          break;
        case "active":
          setFilteredTodos(todos.filter((el) => el.isCompleted === false));
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    };
    handleFilter();
  }, [todos, status]);

  useEffect(() => {
    let left = todos.length;
    todos.map((el) => {
      if (el.isCompleted) {
        return (left -= 1);
      }
      return left;
    });
    setLeft(left);
  }, [todos]);

  return (
    <main className="pad">
      <div className="container">
        <form className="input" onSubmit={handleSubmit}>
          <button type="submit" className="circle" aria-label="add new todo">
            +
          </button>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            name="input"
            aria-label="add new todo"
            placeholder="Create a new todo..."
          />
        </form>
        <DragDropContext
          onDragEnd={(param) => {
            const srcId = param.source.index;
            const destId = param.destination?.index;
            if (destId === undefined) return;
            todos.splice(destId, 0, todos.splice(srcId, 1)[0]);
          }}
        >
          <section className="todos" aria-label="todos">
            <Droppable droppableId="droppable-1">
              {(provided, _) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {filteredTodos.map((item, i) => {
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={"draggable-" + item.id}
                        index={i}
                      >
                        {(provided, _) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Todo
                              key={item.id}
                              {...item}
                              todos={todos}
                              setTodos={setTodos}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {filteredTodos.length === 0 && (
              <p className="empty">No Items to Display</p>
            )}
            <div className="info">
              <span className="left">
                {left} {left === 1 ? "item" : "items"} left
              </span>
              {size > 540 && <Filters status={status} setStatus={setStatus} />}
              <button
                className="clear-completed"
                onClick={handleClearCompleted}
              >
                Clear Completed
              </button>
            </div>
          </section>
        </DragDropContext>
        {size < 540 && (
          <div className="filters-container">
            <Filters status={status} setStatus={setStatus} />
          </div>
        )}
        <span className="tip">Drag and drop to reorder list</span>
      </div>
    </main>
  );
};

export default TodosContainer;
