// frontend/src/components/Navigation/Navigation.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="home-knb-icon">
      <div className="go-to-main-button">
        <li className="fa-sharp fa-solid fa-highlighter fa-2x">
          <NavLink exact to="/">
            knb-BnB
          </NavLink>
        </li>
      </div>
{sessionUser && <div>
  <NavLink exact to="/spots/new" >Create a New Spot</NavLink>
  </div>}
      {isLoaded && (
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </ul>
  );
}

export default Navigation;
