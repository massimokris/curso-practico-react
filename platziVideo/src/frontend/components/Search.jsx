import React from "react";
import classNames from "classnames";
import "../assets/styles/components/Search.scss";

const Search = ({ isHome }) => {
  const inputStyle = classNames("input__search", {
    isHome,
  });
  return (
    <section className="main">
      <h2 className="main__title">¿Qué quieres ver hoy?</h2>
      <input className={inputStyle} type="text" placeholder="Buscar..." />
    </section>
  );
};

export default Search;
