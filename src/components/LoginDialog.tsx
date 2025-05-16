import { useRef, useState, type FormEventHandler } from 'react'
import Dialog from './Dialog'
import { login } from '../api/auth.api'
import { api } from '../api'

const LoginDialog = ({
  setLoading
}: {
  setLoading: (val: boolean) => void
}) => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(true)
  const password = useRef<HTMLInputElement>(null)
  const username = useRef<HTMLInputElement>(null)

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login({
        username: username.current?.value as string,
        password: password.current?.value as string
      })
      setLoginDialogOpen(false)
      api.defaults.headers.common.Authorization = username.current?.value
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
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
  )
}

export default LoginDialog
