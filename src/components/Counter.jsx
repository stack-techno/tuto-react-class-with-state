import React from "react";

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
       <form>
        <input type="text" onChange={this.props.handleChange} />
       </form>
        <h1>{this.props.counter}</h1>
        <h4>{this.props.name}</h4>
        <button onClick={this.props.handleIncrement}>Incrementer+</button>
      </>
    );
  }
}
