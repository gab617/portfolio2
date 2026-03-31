import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { urls_ping } from "./assets/jsonData.json";

import { Inicio } from "./pages/Home/Inicio";
import { Works } from "./pages/Home/Works";
import { FormContact } from "./pages/Home/FormContact";
import { Cv } from "./pages/CV/Cv";
import { Apis } from "./pages/APIs/Apis";
import { Credit } from "./pages/Credit/Credit";
import { Promos } from "./components/promos/Promos";
import { Navbar } from "./components/Layout/Navbar";
import { ConsolaInfo } from "./pages/Home/ConsolaInfo";

function HomePage() {
  return (
    <>
      <Inicio />
      <Works />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<Works />} />
            <Route path="/tools" element={<Credit />} />
            <Route path="/api-tester" element={<Apis />} />
            <Route path="/cv" element={<Cv />} />
            <Route path="/publ" element={<Promos />} />
            <Route path="/contact" element={<FormContact urlPing={urls_ping[3]} />} />
          </Routes>
        </main>

        <footer className="fixed bottom-3 right-3 z-50">
          <ConsolaInfo />
        </footer>
      </div>
    </Router>
  );
}

export default App;
