import { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'sonner'

import { buscarCliente, enviarCodigo, validarCodigo } from './api/cliente.api'
import { obtenerEstadoCuenta } from './api/estado-cuenta.api'
import ExitBtn from './components/ExitBtn'
import Layout from './components/Layout'
import LoginDialog from './components/LoginDialog'
import SpinningLoader from './components/SpinningLoader'
import BuscarClientePage from './pages/BuscarClientePage'
import ClientNotFoundPage from './pages/ClientNotFoundPage'
import ConfirmarDatosPage from './pages/ConfirmarDatosPage'
import HomePage from './pages/HomePage'
import ListaEstadosCtaPage from './pages/ListaEstadosCtaPage'
import PrecalificadorPage from './pages/PrecalificadorPage'
import ValidarCodigoPage from './pages/ValidarCodigoPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [currentUser, setCurrentUser] = useState({
    nombre: '',
    rfc: '',
    celular: ''
  })
  const [estadosCta, setEstadosCta] = useState([])
  const [loading, setLoading] = useState(false)

  function renderAnimatedPage(page: string) {
    if (page === 'home' || page === 'precalificador') return renderPage(page)

    const pageKey = page
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={pageKey}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          {renderPage(page)}
        </motion.div>
      </AnimatePresence>
    )
  }

  function renderPage(page: string) {
    switch (page) {
      case 'home':
        return <HomePage changePage={setCurrentPage} />
      case 'buscarCliente':
        return <BuscarClientePage getClientes={getClientes} />
      case 'confirmarDatos':
        return (
          <ConfirmarDatosPage
            confirmarDatos={confirmarDatos}
            currentUser={currentUser}
          />
        )
      case 'validarCodigo':
        return (
          <ValidarCodigoPage
            validarCodigo={validarCodigoCliente}
            currentUser={currentUser}
          />
        )
      case 'listaEstadosCta':
        return (
          <ListaEstadosCtaPage
            changePage={setCurrentPage}
            currentUser={currentUser}
            estadosCta={estadosCta}
            setLoading={setLoading}
          />
        )
      case 'precalificador':
        return <PrecalificadorPage />
      case '404cliente':
        return <ClientNotFoundPage />
      default:
        return <h1>Página no encontrada</h1>
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      switch (currentPage) {
        case 'listaEstadosCta':
          try {
            setLoading(true)
            // const data = await obtenerEstadoCuenta(currentUser.rfc)
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

  async function getClientes({
    rfc,
    celular
  }: {
    rfc?: string
    celular?: string
  }) {
    try {
      setLoading(true)
      const cliente = await buscarCliente({ rfc, celular })
      setCurrentUser(cliente)
      setCurrentPage('confirmarDatos')
    } catch (error: any) {
      if (error.message === '404') {
        setCurrentPage('404cliente')
        return
      }
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function confirmarDatos() {
    try {
      setLoading(true)
      await enviarCodigo({
        rfc: currentUser.rfc,
        celular: currentUser.celular
      })
      setCurrentPage('validarCodigo')
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function validarCodigoCliente(rfc: string, codigo: string) {
    try {
      setLoading(true)
      await validarCodigo({ rfc, codigo })
      setCurrentPage('listaEstadosCta')
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  function exitEstadoCta() {
    setCurrentPage('home')
    setCurrentUser({ nombre: '', rfc: '', celular: '' })
    setEstadosCta([])
  }

  return (
    <>
      <Layout
        usePadding={currentPage !== 'home' && currentPage !== 'precalificador'}
      >
        {renderAnimatedPage(currentPage)}
      </Layout>
      {loading && <SpinningLoader />}
      {currentPage !== 'home' && <ExitBtn exit={exitEstadoCta} />}
      <Toaster position="top-right" />
      <LoginDialog setLoading={setLoading} />
    </>
  )
}

export default App
