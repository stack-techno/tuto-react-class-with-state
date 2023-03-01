import React,{useState, useEffect, useRef} from 'react'
import { TodoList } from '../components/TodoList';
const initialTodos =[
    {
    id:1,
    title:'titre1',
    completed:true
},
{
    id:2,
    title:'titre2',
    completed:false
},
{
    id:3,
    title:'titre3',
    completed:true
}
]
export const App = () => {

   const [todos, setTodos]= useState([])
   const [isLoading, setIsLoading ]= useState(false)
   const [isDeleted, setIsDeleted ]= useState(false)
   const [name, setName ]= useState("")
   const ref = useRef(null)
   useEffect(()=>{
    fetchTodos()
    console.log("btnRefesh:",ref.current);
   },[])
    function fetchTodos() {
        setIsLoading(true)
        setIsDeleted(false)
        console.log("loading 1:", isLoading);
        fetch("https://jsonplaceholder.typicode.com/todos")
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log("todos:", data);
            setTodos(data)
            
          })
          .catch((err) => {
            console.log(err);
          }).finally(()=>{
            setIsLoading(false)
          })
      }
    
    
      const handleChange = (e) => {
        e.preventDefault();
        setName(e.target.value)
      };
      function handleDelete(id) {
        setIsDeleted(false)
        let value = confirm("voulez-vous supprimer ?");
        if (value) {
          const todosOld = [...todos];
          const todosFiltered = todosOld.filter((todo) => todo.id !== parseInt(id));
          setTodos(todosFiltered)
          setIsDeleted(true)
        }
      }
      const handleRefresh = (e) => {
        fetchTodos();
      };
  return (
    <div className="App">
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
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <TodoList todos={todos} handleDelete={handleDelete} isDeleted={isDeleted}/>
      )}

    </div>
  </div>
  )
}
