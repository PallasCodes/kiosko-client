import { toast } from 'sonner'
import { api } from '.'

export async function login({
  username,
  password
}: {
  username: string
  password: string
}) {
  try {
    const { data } = await api.post('/auth/login', { username, password })
    return data
  } catch (error) {
    toast.error('Error al iniciar sesión')
    throw new Error('Error al iniciar sesión')
  }
}
