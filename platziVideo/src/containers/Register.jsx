import React from "react";
import { Link } from "react-router-dom";

//styles
import "../assets/styles/components/Register.scss";

const Register = () => (
  <section className="register">
    <section className="register__container">
      <h2 tabIndex="0">Regístrate</h2>
      <form className="register__container--form">
        <input
          aria-label="Nombre"
          className="input"
          type="text"
          placeholder="Nombre"
        />
        <input
          aria-label="Correo"
          className="input"
          type="email"
          placeholder="Correo"
        />
        <input
          aria-label="Contraseña"
          className="input"
          type="password"
          placeholder="Contraseña"
        />
        <button className="button">Registrarme</button>
      </form>
      <Link to="/login">Iniciar sesión</Link>
    </section>
  </section>
);

export default Register;
