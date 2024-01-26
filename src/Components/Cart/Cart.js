import React, { useEffect, useState } from "react";
import {
  collection,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartRef = collection(db, "cart");
      const cartSnapshot = await getDocs(cartRef);
      setCartItems(
        cartSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    fetchCartItems();
  }, []);

  const incrementItem = async (id) => {
    const itemRef = doc(db, "cart", id);
    const itemSnapshot = await getDoc(itemRef);

    if (!itemSnapshot.exists()) {
      console.error(`No document found with id: ${id}`);
      return;
    }

    const item = itemSnapshot.data();
    await updateDoc(itemRef, { quantity: item.quantity + 1 });
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementItem = async (id) => {
    const itemRef = doc(db, "cart", id);
    const itemSnapshot = await getDoc(itemRef);

    if (!itemSnapshot.exists()) {
      console.error(`No document found with id: ${id}`);
      return;
    }

    const item = itemSnapshot.data();
    if (item.quantity > 1) {
      await updateDoc(itemRef, { quantity: item.quantity - 1 });
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } else {
      removeItem(id);
    }
  };
  const removeItem = async (id) => {
    const itemRef = doc(db, "cart", id);
    const itemSnapshot = await getDoc(itemRef);

    if (!itemSnapshot.exists()) {
      console.error(`No document found with id: ${id}`);
      return;
    }

    await deleteDoc(itemRef);
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <div className="top-space"></div>
      <ul>
        {cartItems.map((item, index) => (
          <div key={index}>
            <li>
              {item.name}: {item.price} x {item.quantity}
              <button onClick={() => incrementItem(item.id)}>+</button>
              <button onClick={() => removeItem(item.id)}>Remove</button>
              <button onClick={() => decrementItem(item.id)}>-</button>
            </li>
          </div>
        ))}
      </ul>
      <p>Total: {total}</p>
    </div>
  );
};

export default Cart;
