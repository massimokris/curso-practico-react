import React from "react";
import "../assets/styles/components/Carousel.scss";

const Carousel = ({ children }) => (
  <section className="carousel">
    <section className="carousel__container">{children}</section>
  </section>
);

export default Carousel;
