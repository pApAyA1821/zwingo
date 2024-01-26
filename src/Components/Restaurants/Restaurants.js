import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import "./Restaurants.css";
import { Link } from "react-router-dom";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const restaurantsCollection = collection(db, "restaurants");
      const restaurantSnapshot = await getDocs(restaurantsCollection);
      const restaurantList = restaurantSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRestaurants(restaurantList);
    };
    fetchData();
  }, []);

  return (
    <div className="res-list">
      <p>Few special Restaurants near you</p>
      <div
        className="res-cards"
        style={{ display: "flex", overflowX: "scroll" }}
      >
        {restaurants.map((restaurant) => (
          <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id}>
            <div
              className="res-card"
              style={{ backgroundImage: `url(${restaurant.imageURL})` }}
            >
              <div className="res-card-content">
                <h2>{restaurant.name}</h2>
                <div className="rating">
                  <p>Rating: {restaurant.rating}</p>
                  <img
                    src="https://img.icons8.com/ios-filled/50/000000/star--v1.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
