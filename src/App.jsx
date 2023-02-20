import reactLogo from "./assets/react.svg";
import "./App.css";
import { Counter } from "./components/Counter";
import React from "react";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      counter: 0,
      name: ''
    }

  }
  handleIncrement = (e) => {
     let nameContat ="Bonjour State"+(this.state.counter+ 1)
    this.setState({counter: this.state.counter +1})
    this.setState({name: nameContat})
  };
  handleChange =(e)=>{
    e.preventDefault()
    this.setState({name: e.target.value})
  }
  render() {
    return (
      <div className="App">
        <div className="card"></div>
        <div className="read-the-docs">
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
