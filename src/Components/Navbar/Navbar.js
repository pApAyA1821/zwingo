import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import "./Navbar.css";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebase";

const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartRef = collection(db, "cart");
      const cartSnapshot = await getDocs(cartRef);
      setCartItems(cartSnapshot.docs.map((doc) => doc.data()));
    };

    fetchCartItems();
  }, []);

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
        <span className="cart-count">{cartItems.length}</span>
      </div>
    </div>
  );
};

export default Navbar;
