import { useState } from 'react'

import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import BuscarClientePage from './pages/BuscarClientePage'
import ConfirmarDatosPage from './pages/ConfirmarDatosPage'
import ValidarCodigoPage from './pages/ValidarCodigoPage'

function App() {
  const [currentPage, setCurentPage] = useState('home')
  const [currentUser, setCurrentUser] = useState({
    nombre: '',
    rfc: '',
    celular: ''
  })

  function renderPage(page: string) {
    switch (page) {
      case 'home':
        return <HomePage changePage={setCurentPage} />
      case 'buscarCliente':
        return (
          <BuscarClientePage
            changePage={setCurentPage}
            setCurrentUser={setCurrentUser}
          />
        )
      case 'confirmarDatos':
        return (
          <ConfirmarDatosPage
            changePage={setCurentPage}
            currentUser={currentUser}
          />
        )
      case 'validarCodigo':
        return (
          <ValidarCodigoPage
            changePage={setCurentPage}
            currentUser={currentUser}
          />
        )
      default:
        return <h1>Page not found</h1>
    }
  }

  return (
    <Layout usePadding={currentPage !== 'home'}>
      {renderPage(currentPage)}
    </Layout>
  )
}

export default App
