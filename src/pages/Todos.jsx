import React, { useState, useEffect, useRef } from "react";
import { TodoList } from "../components/TodoList";
import Navbar from "../components/Navbar";
import { CustomLoader } from "../components/shared/CustomLoader";
const initialTodos = [
  {
    id: 1,
    title: "titre1",
    completed: true,
  },
  {
    id: 2,
    title: "titre2",
    completed: false,
  },
  {
    id: 3,
    title: "titre3",
    completed: true,
  },
];
export const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [remeberMe, setRemeberMe] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    fetchTodos();
    console.log("btnRefesh:", ref.current);
  }, []);
  function fetchTodos() {
    setIsLoading(true);
    setIsDeleted(false);
    console.log("loading 1:", isLoading);
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("todos:", data);
        setTodos(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  function handleDelete(id) {
    setIsDeleted(false);
    let value = confirm("voulez-vous supprimer ?");
    if (value) {
      const todosOld = [...todos];
      const todosFiltered = todosOld.filter((todo) => todo.id !== parseInt(id));
      setTodos(todosFiltered);
      setIsDeleted(true);
    }
  }
  const handleRefresh = (e) => {
    fetchTodos();
  };
  const todoSorted = ()=>{
    return todos.slice().sort((a, b)=>b.completed -  a.completed )
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = { title, completed: completed ? true : false };
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: { form },
    })
      .then((response) => {
        console.log("first", response.json());
        fetchTodos();
      })
      .then((data)=>{
        console.log("data", data);
      })
      .catch((e) => {
        console.log("erreur",e);
      });
  };
  return (
    <div className="App" ref={ref}>
       <Navbar/>
      <div className="card">
        <h2>Liste des Tâches</h2>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-7">
            {" "}
            <button
              type="button"
              className="my-3"
              onClick={handleRefresh}
              ref={ref}
            >
              Rafraichir
            </button>
          </div>
        </div>
        {isLoading ? (
          <CustomLoader/>
        ) : (
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label for="exampleInputEmail1">Titre </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    name="title"
                    aria-describedby="emailHelp"
                    placeholder="Enter titre"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    onChange={(e) => setCompleted(e.target.value)}
                  />
                  <label className="form-check-label" for="exampleCheck1">
                    La tâche est-t-elle finie?
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                {/* <div className="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                  {email}
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="username"
                    onChange={(e)=>setUserName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    onChange={(e)=>setRemeberMe(e.target.value)}
                  />
                  <label className="form-check-label" for="exampleCheck1">
                    Se souvenir de moi
                  </label>
                </div>
                <button 
                 type="submit" 
                 className="btn btn-primary"
                 >
                  Submit
                </button> */}
              </form>
            </div>
            <div className="col-md-6">
              <TodoList
                todos={todoSorted()}
                handleDelete={handleDelete}
                isDeleted={isDeleted}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
