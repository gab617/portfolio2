/* eslint-disable react/jsx-key */
import { urls_ping } from './assets/jsonData.json'

import './App.css'
import { FormContact } from './FormContact.jsx'
import { Header } from './Header.jsx'
import { Inicio } from './Inicio.jsx'
import { Works } from './Works.jsx'

function App() {

  return (
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
  )
}

export default App
