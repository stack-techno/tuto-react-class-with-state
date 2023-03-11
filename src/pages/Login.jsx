import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [user, setUser] = useState({})
  const [role, setRole] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const userRegister = { email, username, password, role };
    const raw = JSON.stringify(userRegister);

    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // const requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // };

    // fetch("http://localhost:4500/api/auth/register", requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setUser(data)
    //   })
    //   .catch((e) => console.log("ereur..", e));
    axios.post('http://localhost:4500/api/auth/register',userRegister)
    .then(({data})=>setUser(data))
    .catch((e) => console.log("ereur..", e));
  };
  useEffect(()=>{
     if (user !== undefined) {
        localStorage.setItem('access_token',JSON.stringify(user.access_token))
     }
  },[user])
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form method="post" onSubmit={handleSubmit}>
            { JSON.stringify(user)}
            <h1>Creer votre compte</h1>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control mt-3"
                id="exampleInputEmail1"
                name="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {email}
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Username</label>
              <input
                type="text"
                className="form-control mt-3"
                id="exampleInputPassword1"
                placeholder="username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control mt-3"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-group mt-3">
              <label for="inputGroupSelect02 mr-3">Role</label>

              <select
                className="form-control"
                id="inputGroupSelect02"
                onChange={(e) => setRole(e.target.value)}
              >
                <option selected>Choisir...</option>
                <option value="admin">ADMIN</option>
                <option value="super_admin">SUPER ADMIN</option>
                <option value="atelent">DEVELOPPEUR</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              Enregistrer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
