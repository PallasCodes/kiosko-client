import { toast } from 'sonner'
import { api } from '.'

const PREFIX = '/estado-cuenta'

export async function obtenerEstadoCuenta(rfc: string) {
  try {
    const { data } = await api.get(`${PREFIX}/estados?rfc=${rfc}`)
    return data
  } catch (error) {
    toast.error('Error al obtener el estado de cuenta')
    throw new Error('Error al obtener el estado de cuenta')
  }
}

export async function getPdfEstadoCta(idOrden: number) {
  try {
    const { data } = await api.post(`${PREFIX}/generar-pdf`, { idOrden })
    return data
  } catch (error) {
    toast.error('Error al obtener el PDF del estado de cuenta')
    throw new Error('Error al obtener el PDF del estado de cuenta')
  }
}

export async function sendSms({
  rfc,
  idOrden,
  celular
}: {
  rfc: string
  idOrden: string
  celular: string
}) {
  try {
    const { data } = await api.post(`${PREFIX}/send-sms`, {
      rfc,
      idOrden,
      celular
    })
    return data
  } catch (error) {
    toast.error('Error al enviar el SMS')
    throw new Error('Error al enviar el SMS')
  }
}

export async function printEstadoCta({
  idOrden,
  pdfUrl
}: {
  idOrden: number
  pdfUrl: string
}) {
  try {
    const { data } = await api.post(`${PREFIX}/print`, { idOrden, pdfUrl })
    return data
  } catch (error) {
    toast.error('Error al imprimir el estado de cuenta')
    throw new Error('Error al imprimir el estado de cuenta')
  }
}
