import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEventHandler
} from 'react'

import { Toaster } from 'sonner'
import { AnimatePresence, motion } from 'framer-motion'

import { buscarCliente, enviarCodigo, validarCodigo } from './api/cliente.api'
import { obtenerEstadoCuenta } from './api/estado-cuenta.api'
import ExitBtn from './components/ExitBtn'
import Layout from './components/Layout'
import SpinningLoader from './components/SpinningLoader'
import BuscarClientePage from './pages/BuscarClientePage'
import ConfirmarDatosPage from './pages/ConfirmarDatosPage'
import HomePage from './pages/HomePage'
import ListaEstadosCtaPage from './pages/ListaEstadosCtaPage'
import PrecalificadorPage from './pages/PrecalificadorPage'
import ValidarCodigoPage from './pages/ValidarCodigoPage'
import ClientNotFoundPage from './pages/ClientNotFoundPage'
import Dialog from './components/Dialog'
import { login } from './api/auth.api'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [currentUser, setCurrentUser] = useState({
    nombre: '',
    rfc: '',
    celular: ''
  })
  const [estadosCta, setEstadosCta] = useState([])
  const [loading, setLoading] = useState(false)
  const [loginDialogOpen, setLoginDialogOpen] = useState(true)
  const password = useRef<HTMLInputElement>(null)
  const username = useRef<HTMLInputElement>(null)

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

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login({
        username: username.current?.value as string,
        password: password.current?.value as string
      })
      setLoginDialogOpen(false)
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
    } finally {
      setLoading(false)
    }
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
      <Dialog
        isOpen={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        className="max-w-md "
        persistent
      >
        {
          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <h3 className="text-center text-2xl font-bold">Inicio de sesión</h3>
            <input
              type="text"
              placeholder="Nombre de usuario"
              className="border px-4 py-2 rounded"
              ref={username}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="border px-4 py-2 rounded"
              ref={password}
            />
            <button type="submit" className="btn-primary">
              Iniciar sesión
            </button>
          </form>
        }
      </Dialog>
    </>
  )
}

export default App
