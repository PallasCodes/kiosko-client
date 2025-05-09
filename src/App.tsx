import { useEffect, useState } from 'react'

import { obtenerEstadoCuenta } from './api/estado-cuenta.api'
import Layout from './components/Layout'
import SpinningLoader from './components/SpinningLoader'
import BuscarClientePage from './pages/BuscarClientePage'
import ConfirmarDatosPage from './pages/ConfirmarDatosPage'
import HomePage from './pages/HomePage'
import ListaEstadosCtaPage from './pages/ListaEstadosCtaPage'
import ValidarCodigoPage from './pages/ValidarCodigoPage'
import { buscarCliente } from './api/cliente.api'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [currentUser, setCurrentUser] = useState({
    nombre: '',
    rfc: '',
    celular: ''
  })
  const [estadosCta, setEstadosCta] = useState([])
  const [loading, setLoading] = useState(false)

  function renderPage(page: string) {
    switch (page) {
      case 'home':
        return <HomePage changePage={setCurrentPage} />
      case 'buscarCliente':
        return <BuscarClientePage getClientes={getClientes} />
      case 'confirmarDatos':
        return (
          <ConfirmarDatosPage
            changePage={setCurrentPage}
            currentUser={currentUser}
          />
        )
      case 'validarCodigo':
        return (
          <ValidarCodigoPage
            changePage={setCurrentPage}
            currentUser={currentUser}
          />
        )
      case 'listaEstadosCta':
        return (
          <ListaEstadosCtaPage
            changePage={setCurrentPage}
            currentUser={currentUser}
            estadosCta={estadosCta}
          />
        )
      default:
        return <h1>Page not found</h1>
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      switch (currentPage) {
        case 'listaEstadosCta':
          try {
            setLoading(true)
            // const estados = await obtenerEstadoCuenta(currentUser.rfc)
            const data = await obtenerEstadoCuenta('GODR830305J19')
            setEstadosCta(data.estadosCta ?? [])
          } catch (error) {
            setEstadosCta([])
            console.error('Error al obtener el estado de cuenta:', error)
          } finally {
            setLoading(false)
          }
          break
      }
    }
    fetchData()
  }, [currentPage])

  async function getClientes(rfc: string) {
    try {
      setLoading(true)
      const cliente = await buscarCliente({ rfc, celular: '' })
      setCurrentUser(cliente)
      setCurrentPage('confirmarDatos')
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Layout usePadding={currentPage !== 'home'}>
        {renderPage(currentPage)}
      </Layout>
      {loading && <SpinningLoader />}
    </>
  )
}

export default App
