import { useState, useEffect } from "react";

const useInitialState = (API) => {
  //useState se encarga de manejar los estados de los componentes
  // y recibir la info de los distintos servicios
  const [videos, setVideos] = useState([]);

  //useEffect se encarga de los request a las apis
  //y traer o enviar informacion para utilizarla en useState
  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => setVideos(data));
  }, []);

  return videos || "";
};

export default useInitialState;
