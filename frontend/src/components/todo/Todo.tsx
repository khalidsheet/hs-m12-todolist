import { Todo as ITodo } from "../../interfaces/Todo";
import "./todo.css";

interface TodoListProps {
  todo: ITodo;
  onTodoClick: (id: number) => void;
}

export const Todo = ({ todo, onTodoClick }: TodoListProps) => {
  const handleTodoClicked = () => {
    onTodoClick && onTodoClick(todo.id);
  };

  return (
    <div className="todo-item" onClick={handleTodoClicked}>
      <label htmlFor="#todo">
        <input id="todo" type="checkbox" checked={todo.completed} readOnly />
        <span
          className={`inline-block ml-1 ${todo.completed ? "checkmark " : ""}`}
        >
          {todo.title}
        </span>
      </label>
    </div>
  );
};
