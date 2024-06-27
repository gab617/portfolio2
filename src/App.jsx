/* eslint-disable react/jsx-key */
import { urls_ping } from './assets/jsonData.json'

import './App.css'
import { FormContact } from './pages/Home/FormContact.jsx'
import { Header } from './pages/Home/Header.jsx'
import { Inicio } from './pages/Home/Inicio.jsx'
import { Works } from './pages/Home/Works.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Apis } from './pages/APIs/Apis.jsx'

function App() {

  return (
    <>
      <Router>
        <Routes>

          <Route
            path='/'
            element={
              <>
                <Header />
                {/* INICIO */}
                <Inicio />
                {/* PROYECTOS */}
                <Works />
                {/* CONTACTO */}
                <FormContact
                  urlPing={urls_ping[3]}
                />
              </>
            }
          />

          <Route
            path='/apis'
            element={
              <>
                <Apis
                
                />
              </>
            }

          />

        </Routes>
      </Router>



    </>
  )
}

export default App
