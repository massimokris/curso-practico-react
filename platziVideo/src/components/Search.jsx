import React from 'react';
import '../assets/styles/components/Search.scss';

const Search = () => (
    <section className="main">
      <h2 className="main__title">¿Qué quieres ver hoy?</h2>
      <input className="input__search" type="text" placeholder="Buscar..." />
    </section>
);

export default Search;