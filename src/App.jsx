/* eslint-disable react/jsx-key */
import { urls_ping } from "./assets/jsonData.json";

import "./App.css";
import { FormContact } from "./pages/Home/FormContact.jsx";
import { Header } from "./pages/Home/Header.jsx";
import { Inicio } from "./pages/Home/Inicio.jsx";
import { Works } from "./pages/Home/Works.jsx";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Apis } from "./pages/APIs/Apis.jsx";
import { Cv } from "./pages/CV/Cv.jsx";
import { useContext, useState } from "react";
import { Context } from "./Context/Context.jsx";
import { ConsolaInfo } from "./pages/Home/ConsolaInfo.jsx";
import { Credit } from "./pages/Credit/Credit.jsx";

function App() {
  const { requests } = useContext(Context);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                {/* INICIO */}
                <Inicio />
                {/* PROYECTOS */}
                <Works />
                {/* CONTACTO */}
                <FormContact urlPing={urls_ping[3]} />

              </>
            }
          />

          <Route
            path="/apis"
            element={
              <>
                <Apis />
              </>
            }
          />

          <Route
            path="/cv"
            element={
              <>
                <Cv />
              </>
            }
          />

          <Route path="/credit" element={<>
            <Credit/>
          </>} />
        </Routes>
      </Router>
      <footer class="fixed bottom-0 right-1 p-3 flex bg-gray-100 bg-opacity-10  z-50  rounded-full">
        <ConsolaInfo />
      </footer>
    </>
  );
}

export default App;
