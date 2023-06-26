import { Todo as ITodo } from "../../interfaces/Todo";
import { Todo } from "../todo/Todo";
import "./todoList.css";

interface TodoListProps {
  todos: ITodo[];
  onTodoClick: (id: number) => void;
}

export const TodoList = (props: TodoListProps) => {
  return (
    <div className="todo-list-container">
      {props.todos.length > 0 ? (
        props.todos.map((todo) => (
          <Todo todo={todo} key={todo.id} onTodoClick={props.onTodoClick} />
        ))
      ) : (
        <div className="no-todos">No todos</div>
      )}
    </div>
  );
};
