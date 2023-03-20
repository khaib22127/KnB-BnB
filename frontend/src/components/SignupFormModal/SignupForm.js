// frontend/src/components/SignupFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors.length > 0) return;
    setErrors([]);
    if (password === confirmPassword) {
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };
  let isDiabled;
  if (
    !email ||
    !username ||
    !firstName ||
    !lastName ||
    !password ||
    !confirmPassword ||
    password.length < 6 ||
    username.length < 4 ||
    password !== confirmPassword
  ) {
    isDiabled = true;
  } else {
    isDiabled = false;
  }

  return (
    <div className="main-_sign_up-container">
      <div className="sign-up-container">
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <ul>
            {Object.values(errors).map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="sign-up_padding">
            <label>Email</label>
            <br />
            <input
              className="all_input_sign-box"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="sign-UP-01">
            <label>Username</label>
            <input
              className="all_input_sign-box"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="sign-up_padding">
            <label>First Name</label>
            <input
              className="all_input_sign-box"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="sign-UP-01">
            <label>Last Name</label>
            <input
              className="all_input_sign-box"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="sign-up_padding">
            <label>Password</label>
            <input
              className="all_input_sign-box"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="sign-UP-01">
            <label>Confirm Password</label>
            <input
              className="all_input_sign-box"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="signup-summit-btn">
            <button id="signup_btn_n" type="submit" disabled={isDiabled}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupFormModal;
