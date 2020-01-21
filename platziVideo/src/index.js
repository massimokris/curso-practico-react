/**
 * Esto es el entry point de la app
 * donde le indico los elementos que voy
 * a enviar a la vista
 */
import React from 'react';
import ReactDOM from 'react-dom';

//importo componentes
import App from './containers/App';


ReactDOM.render(<App />, document.getElementById('app'));