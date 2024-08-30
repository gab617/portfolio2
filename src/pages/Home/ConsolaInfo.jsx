import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";

export function ConsolaInfo() {
  const [allLoaded, setAllLoaded] = useState(false);
  const [requests, setRequests] = useState({
    1: {
      title: "Dota2 App",
      load: true,
      url_ping: "https://serviciosunificados.onrender.com/d2/ping",
    },
    0: {
      title: "Basic words",
      load: true,
      url_ping: "https://serviciosunificados.onrender.com/bw/ping",
    },
    2: {
      title: "Giphy",
      load: true,
      url_ping: "https://giphy617.onrender.com/ping",
    },
    3: {
      title: "Servicio de contacto",
      load: true,
      url_ping: "https://portf-617-express.onrender.com/ping",
    },
  });

  function allLoadedVerif(reqs) {
    return Object.values(reqs).every((reqProy) => reqProy.load === false);
  }

  function refreshResquests() {
    if (allLoadedVerif(requests)){
      console.log('Se resolvieron todas las peticiones a servicios')
      setAllLoaded(true)
    }
  }

  return (
    <div class="relative inline-block group">
      {!allLoaded ? (
        <div class="w-7 h-7 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      ) : (
        <div class="w-7 h-7 border-4 border-green-500 border-t-green-500 rounded-full"></div>
      )}

      <div class="absolute bottom-full right-7 mb-2 bg-gray-800 text-white text-base rounded w-72 h-72 p-2  invisible group-hover:visible">
        {!allLoaded ? (
          <p className="w-full mb-3">
            Levantando inactividad de los servidores... (Desplegados en
            Render.com). La primer solicitud puede tomar unos segundos.
          </p>
        ) : (
          <p className="mb-5">
            Todos los servicios estan activos. Servidores desplegados en
            Render.com
          </p>
        )}

        {Object.keys(requests).map((key) => (
          <div key={key} className="flex gap-2">
            <ProyectInfo refreshResquests={refreshResquests} reqData={requests[key]} k={key} />
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
}

const ProyectInfo = ({ refreshResquests, reqData, k }) => {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    fetch(reqData.url_ping)
      .then((res) => {
        setLoader(false);
        console.log(res.status, "ping: ", reqData.title, reqData.load);
      })
      .then(() => {
        reqData.load = false;
        refreshResquests()
      });
  }, []);

  return (
    <div className="flex gap-2 items-center">
      <h1 className="">{reqData.title}</h1>
      {loader ? (
        <div class=" w-4 h-4 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      ) : (
        <p>✅</p>
      )}
    </div>
  );
};
