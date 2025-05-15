import { toast } from 'sonner'

const API_URL = import.meta.env.VITE_API_URL + '/estado-cuenta'

export async function obtenerEstadoCuenta(rfc: string) {
  try {
    const response = await fetch(`${API_URL}/estados?rfc=${rfc}`)

    if (!response.ok) {
      toast.error('Error al obtener el estado de cuenta')
      throw new Error('Error al obtener el estado de cuenta')
    }

    const data = await response.json()
    return data
  } catch (error) {
    toast.error('Error al obtener el estado de cuenta')
    throw new Error('Error al obtener el estado de cuenta')
  }
}

export async function getPdfEstadoCta(idOrden: number) {
  try {
    const response = await fetch(`${API_URL}/generar-pdf`, {
      method: 'POST',
      body: JSON.stringify({ idOrden }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      toast.error('Error al obtener el PDF del estado de cuenta')
      throw new Error('Error al obtener el PDF del estado de cuenta')
    }

    const data = await response.json()
    return data
  } catch (error) {
    toast.error('Error al obtener el PDF del estado de cuenta')
    throw new Error('Error al obtener el PDF del estado de cuenta')
  }
}

export async function sendSms(rfc: string, idOrden: string) {
  try {
    const response = await fetch(`${API_URL}/send-sms`, {
      method: 'POST',
      body: JSON.stringify({ rfc, idOrden }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      toast.error('Error al enviar el SMS')
      throw new Error('Error al enviar el SMS')
    }

    const data = await response.json()
    return data
  } catch (error) {
    toast.error('Error al enviar el SMS')
    throw new Error('Error al enviar el SMS')
  }
}

export async function printEstadoCta(idOrden: number, pdfUrl: string) {
  try {
    const response = await fetch(`${API_URL}/print`, {
      method: 'POST',
      body: JSON.stringify({ idOrden, pdfUrl }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      toast.error('Error al imprimir el estado de cuenta')
      throw new Error('Error al imprimir el estado de cuenta')
    }

    const data = await response.json()
    return data
  } catch (error) {
    toast.error('Error al imprimir el estado de cuenta')
    throw new Error('Error al imprimir el estado de cuenta')
  }
}
