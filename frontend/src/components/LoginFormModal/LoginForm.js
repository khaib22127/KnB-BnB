// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        return setErrors(["The provided credentials were invalid"]);
      });
  };

  const demoUserSubmitHandler=(e)=> {
    e.preventDefault();
    setErrors([]);
     return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
       .then(closeModal)
       .catch(async (res) => {
         const data = await res.json();
         if (data && data.errors) setErrors(data.errors);
       });
  }

  let isDiabled;
  if (!credential || !password) {
    isDiabled = true;
  } else {
    isDiabled = false;
  }

  return (
    <>
      <div className="login-container">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="username-input-container">
            {/* <label> */}
              {/* Username or Email */}
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
                placeholder="Username or Email"
              />
            {/* </label> */}
          </div>
          <div className="password-container">
            {/* <label> */}
              {/* Password */}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            {/* </label> */}
          </div>
          <br />
          <div className="login-button-container">
            <button disabled={isDiabled} type="submit">
              Log In
            </button>
          </div>
          <br />
          <div className="demo-user-btn-container">
            <button onClick={demoUserSubmitHandler} type='submit' >Log in as Demo User</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
