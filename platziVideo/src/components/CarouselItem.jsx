import React from "react";
import PropTypes from 'prop-types';
import "../assets/styles/components/CarouselItem.scss";

//importo las imagenes y les asigno un nombre
import playIcon from "../assets/static/icons8-play-64.png";
import plusIcon from "../assets/static/plus-icon.png";

const CaruoselItem = ({ cover, title, year, contentRating, duration }) => (
  <section className="carousel-item">
    <img className="carousel-item__img" src={cover} alt={title} />
    <section className="carousel-item__details">
      <section>
        <img
          className="carousel-item__details--img"
          src={playIcon}
          alt="Play Icon"
        />
        <img
          className="carousel-item__details--img"
          src={plusIcon}
          alt="Plus Icon"
        />
      </section>
      <p className="carousel-item__details--title">{title}</p>
      <p className="carousel-item__details--subtitle">
        {`${year} ${contentRating} ${duration}m`}
      </p>
    </section>
  </section>
);

CaruoselItem.propTypes = {
  cover: PropTypes.string, 
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number
};

export default CaruoselItem;
