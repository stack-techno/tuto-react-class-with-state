import React from "react";
import PropTypes from "prop-types";

export const TodoList =(props)=>{
  
  const alertDeleteTodo = () => {
    if (props.isDeleted) {
      return (
        <div className="alert alert-success" role="alert">
          Todo supprimé avec succès!.
        </div>
      );
    }
  };

    return (
      <>
        {alertDeleteTodo()}
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#id</th>
              <th scope="col">Titre</th>
              <th scope="col">Completée ?</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.todos?.map((todo, index) => (
              <tr key={index}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>
                  {todo.completed ? (
                    <span className="badge text-bg-success">Oui</span>
                  ) : (
                    <span className="badge text-bg-secondary">Non</span>
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => props.handleDelete(todo.id)}
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

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
};
