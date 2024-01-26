import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartRef = collection(db, "cart");
      const cartSnapshot = await getDocs(cartRef);
      setCartItems(cartSnapshot.docs.map((doc) => doc.data()));
    };

    fetchCartItems();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <div className="top-space"></div>
      {cartItems.map((item, index) => (
        <div key={index}>
          <p>
            {item.name}: {item.price}
          </p>
        </div>
      ))}
      <p>Total: {total}</p>
    </div>
  );
};

export default Cart;
