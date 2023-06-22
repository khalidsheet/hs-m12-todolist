import "./todoInput.css";

interface TodoInputProps {
  onAddTodo: (title: string) => void;
}

export const TodoInput = (props: TodoInputProps) => {
  const handleInputChange = (event: any) => {
    if (event.target.value === "") return;

    if (event.key === "Enter" || event.keyCode === 13) {
      props.onAddTodo && props.onAddTodo(event.target.value);
      event.target.value = "";
    }
  };

  return (
    <>
      <div className="todo-input-container">
        <input
          type="text"
          placeholder="Add a new todo"
          onKeyUp={handleInputChange}
        />
      </div>
    </>
  );
};
