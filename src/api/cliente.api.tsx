import { toast } from 'sonner'
import { api } from '.'
import { AxiosError } from 'axios'

const PREFIX = '/cliente'

export async function buscarCliente({
  rfc,
  celular
}: {
  rfc?: string
  celular?: string
}) {
  const query = celular === '' ? `rfc=${rfc}` : `celular=${celular}`
  try {
    const { data } = await api.get(`${PREFIX}/buscar-cliente?${query}`)

    return data
  } catch (error) {
    if (error instanceof AxiosError && error.status === 404) {
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
    await api.post(`${PREFIX}/validar-codigo`, { codigo, rfc })
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
    await api.post(`${PREFIX}/enviar-codigo`, { rfc, celular })
  } catch (error) {
    toast.error('Error al enviar el código')
    throw new Error('Error al enviar el código')
  }
}
