import React from "react";
import "./Navbar.css";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = React.useState("Home");

  return (
    <div className="navbar">
      <div className="app-name">
        <h1>Zwingo</h1>
        <p>Welcome, XYZ</p>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("Home");
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
            Home
          </Link>
          {menu === "Home" ? <hr /> : null}
        </li>
        <li
          onClick={() => {
            setMenu("About");
          }}
        >
          About {menu === "About" ? <hr /> : null}
        </li>
        <li
          onClick={() => {
            setMenu("Help");
          }}
        >
          Help {menu === "Help" ? <hr /> : null}
        </li>
      </ul>
      <div className="cart-icon">
        <Link to="/cart">
          <img src={cart_icon} alt="cart-icon" />
        </Link>
        <div className="cart-count">0</div>
      </div>
    </div>
  );
};

export default Navbar;
