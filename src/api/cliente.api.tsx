import { toast } from 'sonner'

const API_URL = import.meta.env.VITE_API_URL + '/cliente'

export async function buscarCliente({
  rfc,
  celular
}: {
  rfc?: string
  celular?: string
}) {
  const query = celular === '' ? `rfc=${rfc}` : `celular=${celular}`
  try {
    const response = await fetch(`${API_URL}/buscar-cliente?${query}`)

    if (response.status === 404) {
      throw new Error('404')
    }

    if (!response.ok) {
      toast.error('Error al buscar tu información')
      throw new Error('Error al buscar el cliente')
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error && error.message === '404') {
      throw new Error('404')
    }
    toast.error('Error al buscar tu información')
    throw new Error('Error al buscar el cliente')
  }
}

export async function validarCodigo({
  rfc,
  codigo
}: {
  rfc: string
  codigo: string
}) {
  try {
    const response = await fetch(`${API_URL}/validar-codigo`, {
      method: 'POST',
      body: JSON.stringify({ codigo, rfc }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      toast.error('Error al validar el código')
      throw new Error('Error al validar el código')
    }
  } catch {
    toast.error('Error al validar el código')
    throw new Error('Error al validar el código')
  }
}

export async function enviarCodigo({
  rfc,
  celular
}: {
  rfc: string
  celular: string
}) {
  try {
    const response = await fetch(`${API_URL}/enviar-codigo`, {
      method: 'POST',
      body: JSON.stringify({ rfc, celular }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      toast.error('Error al enviar el código')
      throw new Error('Error al enviar el código')
    }
  } catch (error) {
    toast.error('Error al enviar el código')
    throw new Error('Error al enviar el código')
  }
}
