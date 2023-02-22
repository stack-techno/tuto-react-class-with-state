import reactLogo from "./assets/react.svg";
import "./App.css";
import { Counter } from "./components/Counter";
import React from "react";
import { TodoList } from "./components/TodoList";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      name: "",
      todos: [],
      isLoading: false,
      isDeleted: false
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  fetchTodos() {
    this.setState({isLoading: true})
    this.setState({isDeleted: false})
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("todos:", data);
        this.setState({ ...this.state, todos: data });
        
      })
      .catch((err) => {
        console.log(err);
      }).finally(()=>{
        this.setState({isLoading: false})
      })
  }

  componentDidMount() {
    this.fetchTodos();
  }
  handleIncrement = (e) => {
    let nameContat = "Bonjour State" + (this.state.counter + 1);
    this.setState({ counter: this.state.counter + 1 });
    this.setState({ name: nameContat });
  };
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  };
  handleDelete(id) {
    this.setState({isDeleted: false})
    let value = confirm("voulez-vous supprimer ?");
    if (value) {
      const todosOld = [...this.state.todos];
      const todosFiltered = todosOld.filter((todo) => todo.id !== parseInt(id));
      this.setState({ ...this.state, todos: todosFiltered });
      this.setState({isDeleted: true})
    }
  }
  handleRefresh = (e) => {
    this.fetchTodos();
  };
  render() {
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
                className="btn btn-primary"
                onClick={this.handleRefresh}
              >
                Rafraichir
              </button>
            </div>
          </div>
          {this.state.isLoading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <TodoList todos={this.state.todos} handleDelete={this.handleDelete} isDeleted={this.state.isDeleted}/>
          )}

          <Counter
            name={this.state.name}
            counter={this.state.counter}
            handleIncrement={this.handleIncrement}
            handleChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
