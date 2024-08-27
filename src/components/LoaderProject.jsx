import { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";

export function LoaderProject({ url, text, title, id }) {
  const { refreshResquests, allLoaded } = useContext(Context);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const timeout = Math.random() * (5000 - 3000) + 3000;
    if (allLoaded) return;

    let dataProyect = { id, title, url };
    setLoader(true);
    fetch(url)
      .then((response) => {
        /* console.log(response.status, "Ping-pong", url); */
        setLoader(false);
      })
      .then(() => {
        refreshResquests(dataProyect, loader);
      });
  }, []);

  return (
    <> </>
    /*     <div
      className={` ${
        loader ? " items-center flex  opacity-100" : "opacity-0 hidden"
      } transition-all duration-500`}
    >
      {loader && (
        <>
          <div className="flex items-center">
            <div className="chaotic-orbit"></div>
            <p className="text-xs">{text}</p>
            <div className="chaotic-orbit"></div>
          </div>
        </>
      )}
    </div> */
  );
}
