import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";

export function ConsolaInfo() {
  const { allLoaded, requests } = useContext(Context);
  const [reqs, setReqs] = useState(requests);

  return (
    <div class="relative inline-block group">
      {!allLoaded ? (
        <div class="w-7 h-7 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      ) : (
        <div class="w-7 h-7 border-4 border-green-500 border-t-green-500 rounded-full"></div>
      )}

      <div class="absolute bottom-full right-7 mb-2 bg-gray-800 text-white text-base rounded w-72 h-72 p-2  invisible group-hover:visible">
        <p className="w-full mb-3">
          Levantando inactividad de los servidores... (Desplegados en
          Render.com). La primer solicitud puede tomar unos segundos.
        </p>
        {Object.keys(reqs).map((key) => (
          <div key={key} className="flex gap-2">
            <ProyectInfo reqData={reqs[key]} k={key} />
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
}

const ProyectInfo = ({ reqData, k }) => {
  const { allLoaded, requests, requestCheck} = useContext(Context);

  const [loader, setLoader] = useState(reqData.load);
  useEffect(()=>{
    setLoader(requests[k]?.load)
  },[requestCheck])

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
