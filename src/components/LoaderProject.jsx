import { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";

export function LoaderProject({ url, text, title, id }) {
  const { refreshResquests } = useContext(Context);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    let dataProyect = { id, title, url };
    setLoader(true);
    fetch(url).then((response) => {
      console.log(response.status, "Ping-pong", url);
      setLoader(false);
      refreshResquests(dataProyect, false);
    });
  }, []);

  return (
    <div
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
    </div>
  );
}
