import { useEffect, useState } from "react";
import "./App.css";
import { TodoList } from "./components/todo-list/TodoList";
import { TodoInput } from "./components/todo-input/TodoInput";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom";

function App() {
  const [todos, setTodos] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth/login");
    }
  }, []);

  const onAddTodo = (title: string) => {
    const newTodo = {
      id: todos.length + 1,
      title,
      completed: false,
    };

    fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") || "",
      },
      body: JSON.stringify(newTodo),
    }).then(() => {
      getTodoes().then((data) => setTodos(data));
    });
  };

  const onTodoClick = (id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(newTodos);

    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") || "",
      },
      body: JSON.stringify(newTodos.find((todo) => todo.id === id)),
    }).then((res) => {
      getTodoes().then((data) => setTodos(data));
    });
  };

  useEffect(() => {
    getTodoes().then((data) => setTodos(data));
  }, []);

  const getTodoes = async () => {
    return await (
      await fetch("http://localhost:5000/api/todos", {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      })
    ).json();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <>
      <Button variant="secondary" onClick={logout}>
        Logout
      </Button>
      <div className="flex h-screen w-screen items-center justify-center flex-col">
        <div className="title">
          <h1 className="text-blue-500 text-2xl font-bold">My TODOs</h1>
        </div>
        <div>
          <TodoList todos={todos} onTodoClick={onTodoClick} />
          <TodoInput onAddTodo={onAddTodo} />
        </div>
      </div>
    </>
  );
}

export default App;
