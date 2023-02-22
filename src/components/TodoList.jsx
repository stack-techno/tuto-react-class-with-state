import React from "react";
import PropTypes from "prop-types";

export class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }
  alertDeleteTodo = () => {
    if (this.props.isDeleted) {
      return (
        <div
        className="alert alert-success" role="alert"
        >
           Todo supprimé avec succès!.
        </div>
      );
    }
  };
  render() {
    return (
      <>
        {this.alertDeleteTodo()}
        <table className="table">
          {JSON.stringify(this.props.isDeleted)}
          <thead>
            <tr>
              <th scope="col">#id</th>
              <th scope="col">Titre</th>
              <th scope="col">Completed</th>
            </tr>
          </thead>
          <tbody>
            {this.props.todos.map((todo, index) => (
              <tr key={index}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.completed ? " oui" : "non"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => this.props.handleDelete(todo.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
};
