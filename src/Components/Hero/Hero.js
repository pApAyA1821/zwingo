import React from "react";
// import PropTypes from "prop-types";
import "./Hero.css";
import scootyman from "../Assets/scooty_man.png";
import food_img1 from "../Assets/food-img1.jpg";
import food_img2 from "../Assets/food-img2.jpg";
import food_img3 from "../Assets/food-img3.jpg";
import food_img4 from "../Assets/food-img4.jpg";

const Hero = () => {
  return (
    <div className="hero">
      <div className="bg-img"> </div>
      <div className="hero-left">
        <div className="wlcm-txt">
          <p> It's not just food, </p>
          <p> it's an experience </p>
        </div>
        <div className="disp-imgs">
          <img src={food_img1} alt="" />
          <img src={food_img2} alt="" />
          <img src={food_img3} alt="" />
          <img src={food_img4} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={scootyman} alt="scootyman" />
      </div>
    </div>
  );
};

export default Hero;
