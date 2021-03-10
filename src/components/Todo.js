import { FaCheck } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

const Todo = ({ id, text, isCompleted, todos, setTodos }) => {
  const handleCompleted = () => {
    setTodos(
      todos.map((el) => {
        if (el.id === id) {
          return { ...el, isCompleted: !el.isCompleted };
        }
        return el;
      })
    );
  };

  const handleRemove = () => {
    setTodos(todos.filter((el) => el.id !== id));
  };

  return (
    <article
      className={isCompleted ? "todo completed" : "todo"}
      aria-label="todo item"
    >
      <button
        className="check"
        aria-label="toggle completed"
        onClick={handleCompleted}
      >
        <FaCheck />
      </button>
      <p>{text}</p>
      <button className="close" onClick={handleRemove}>
        <GrClose />
      </button>
    </article>
  );
};

export default Todo;
