import React from "react";
import "../assets/styles/components/CarouselItem.scss";

//importo las imagenes y les asigno un nombre
import playIcon from '../assets/static/icons8-play-64.png';
import plusIcon from '../assets/static/plus-icon.png';

const CaruoselItem = () => (
  <section className="carousel-item">
    <img
      className="carousel-item__img"
      src="../images/bird-s-eye-view-of-road-during-daytime-3467150.jpg"
      alt=""
    />
    <section className="carousel-item__details">
      <section>
        <img className="carousel-item__details--img" src={playIcon} alt="Play Icon" />
        <img className="carousel-item__details--img" src={plusIcon} alt="Plus Icon" />
      </section>
      <p className="carousel-item__details--title">Titulo descriptivo</p>
      <p className="carousel-item__details--subtitle">2019 16+ 114min</p>
    </section>
  </section>
);

export default CaruoselItem;
