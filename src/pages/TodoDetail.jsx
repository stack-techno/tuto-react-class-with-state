import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CustomLoader } from "../components/shared/CustomLoader";
export default function TodoDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [todo, setTodo] = useState({});
  function fetchTodoById() {
    setIsLoading(true);

    console.log("loading 1:", isLoading);
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("todos:", data);
        setTodo(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const renderTodo = () => (
    <div className="card" style={{ width: "18rem" }}>
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <p className="card-text">{todo.title}</p>
      </div>
    </div>
  );
  useEffect(() => {
    fetchTodoById();
  }, [id]);
  return (
    <>
      <Navbar />
      <div className="container mt-5">
         {isLoading ?( <CustomLoader/>):(renderTodo())}
      </div>
    </>
  );
}
