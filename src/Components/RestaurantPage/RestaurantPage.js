import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useParams } from "react-router-dom";
import "./RestaurantPage.css";

const Restaurant = () => {
  const { restaurantId } = useParams();
  const [foods, setFoods] = useState([]);
  const [restaurantDoc, setRestaurantDoc] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(restaurantId);
      const query = collection(db, `restaurants/${restaurantId}/foodL`);
      const querySnapshot = await getDocs(query);
      const restaurantDocRef = doc(db, `restaurants/${restaurantId}`);
      const restaurantDocSnap = await getDoc(restaurantDocRef);

      if (!querySnapshot.empty) {
        setFoods(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      } else {
        console.log("No such document!");
      }

      if (!restaurantDocSnap.empty) {
        setRestaurantDoc(restaurantDocSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main-div">
      <div className="top"></div>
      <h2> {restaurantDoc.name} </h2>
      <div className="food-list">
        {foods.map((food) => (
          <div key={food.id} className="food">
            <div className="food-text">
              <p className="food-name">{food.dsc}</p>
              <div className="food-rating-price">
                <p>Rating: {food.rate}</p>
                <p>Price: {food.price}</p>
              </div>
              <button className="btn" onClick={() => addToCart(food)}>
                Add to Cart
              </button>
            </div>
            <img src={food.img} alt={food.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

const addToCart = async (food) => {
  const cartRef = collection(db, "cart");
  try {
    await addDoc(cartRef, {
      name: food.dsc,
      price: food.price,
    });
    console.log("Food item added to cart!");
  } catch (e) {
    console.error("Error adding food item to cart: ", e);
  }
};

export default Restaurant;
