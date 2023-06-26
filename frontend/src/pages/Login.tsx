import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "" || password === "") {
      alert("Please enter your email and password");
      return;
    }

    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          navigate("/");
          localStorage.setItem("token", data.token);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="min-w-[400px]">
        <div className="text-center mb-24">
          <h1 className="text-4xl font-bold">TodoList</h1>
          <h1 className="text-md text-slate-400">
            Please login in to start checking boxes
          </h1>
        </div>
        <form className="flex flex-col mb-4">
          <div>
            <label htmlFor="name">E-Mail</label>
            <input
              type="text"
              id="name"
              className="bg-slate-200 h-14 rounded-lg pl-5 w-full"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="mt-3">
            <label htmlFor="name">Password</label>
            <input
              type="password"
              id="name"
              className="bg-slate-200 h-14 rounded-lg pl-5 w-full"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </form>
        <div className="flex h-12">
          <Button block onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
