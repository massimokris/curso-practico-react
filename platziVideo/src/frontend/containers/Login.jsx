import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginRequest } from "../actions/index";

//styles
import "../assets/styles/components/Login.scss";

//Icons
import googleIcon from "../assets/static/google-icon.png";
import twitterIcon from "../assets/static/twitter-icon.png";

const Login = (props) => {
  const [form, setValues] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    //preventDefault para evitar la funcion por default del form
    event.preventDefault();
    props.loginRequest(form);

    //el valor history nos permite movernos con las diferentes rutas
    //del router
    props.history.push("/");
  };

  return (
    <section className="login">
      <section className="login__container">
        <h2>Inicia sesión</h2>
        <form
          action=""
          className="login__container--form"
          onSubmit={handleSubmit}
        >
          <input
            name="email"
            aria-label="Correo"
            className="input"
            type="text"
            placeholder="Correo"
            onChange={handleInput}
          />
          <input
            name="password"
            aria-label="Contraseña"
            className="input"
            type="password"
            placeholder="Contraseña"
            onChange={handleInput}
          />
          <button className="button">Iniciar sesión</button>
          <div className="login__container--remember-me">
            <label htmlFor="remember">
              <input type="checkbox" name="remember" id="cbox1" value="checkbox" />
              Recuérdame
            </label>
            <a href="/">Olvidé mi contraseña</a>
          </div>
        </form>
        <section className="login__container--social-media">
          <div>
            <img src={googleIcon} alt="Google" />
            Inicia sesión con Google
          </div>
          <div>
            <img src={twitterIcon} alt="Twitter" />
            Inicia sesión con Twitter
          </div>
        </section>
        <p className="login__container--register">
          ¿No tienes ninguna cuenta?
          <Link to="/register"> Regístrate</Link>
        </p>
      </section>
    </section>
  );
};

const mapDispatchToProps = {
  loginRequest,
};

export default connect(null, mapDispatchToProps)(Login);
