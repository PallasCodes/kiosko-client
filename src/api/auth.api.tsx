import { toast } from 'sonner'

const API_URL = import.meta.env.VITE_API_URL + '/auth'

export async function login({
  username,
  password
}: {
  username: string
  password: string
}) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) throw new Error()

    const data = await response.json()
    return data
  } catch (error) {
    toast.error('Error al iniciar sesión')
    throw new Error('Error al iniciar sesión')
  }
}
