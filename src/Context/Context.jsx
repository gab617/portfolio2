/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { themes } from "./themes";

export const Context = createContext({});

export function ContextProvider({ children }) {
  const colorsCant = themes.colours.length - 1;

  const [currentTheme, setCurrentTheme] = useState(themes.dark);
  const [indexColor, setIndexColor] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const [requestCheck, setRequestCheck] = useState(true);
  const [requests, setRequests] = useState({
    1: { title: "Dota2 App", load: true },
    0: { title: "Basic words", load: true },
    2: { title: "Giphy", load: true },
    3: { title: "Servicio de contacto", load: true },
  });
  const allLoadedVerif = (reqs) => {
    console.log(reqs, "asdasd");
    console.log(Object.values(reqs).every((reqProy) => reqProy.load))
    return Object.values(reqs).every((reqProy) => reqProy.load);
    
  };

  function refreshResquests(data, status) {
    console.log(requests, "-----------");
    requests[data.id].load = status;
    setRequestCheck((prev) => !prev);
    console.log(allLoadedVerif(requests))
    if (!allLoadedVerif(requests)) {
      console.log('ALLLLL')
      setAllLoaded(true);
    } else {
      console.log('NOALLALOADED')
    }
  }

  const setTheme = (theme) => {
    if (theme === "colours") {
      let index = indexColor;
      if (indexColor < colorsCant) {
        index++;
      } else {
        index = 0;
      }
      setIndexColor(index);
      setCurrentTheme(themes.colours[index]);
      return;
    }
    if (themes[theme]) {
      setCurrentTheme(themes[theme]);
    } else {
      console.warn(`El tema ${theme} no está definido`);
    }
  };

  useEffect(() => {
    document.body.style.background = currentTheme.background;
    document.body.style.color = currentTheme.color;
  }, [currentTheme]);

  return (
    <Context.Provider
      value={{
        currentTheme,
        setTheme,
        requests,
        refreshResquests,
        requestCheck,
        allLoaded,
      }}
    >
      {children}
    </Context.Provider>
  );
}
