const API_URL = 'http://localhost:3000/api/estado-cuenta'

export async function obtenerEstadoCuenta(rfc: string) {
  const response = await fetch(`${API_URL}/estados?rfc=${rfc}`)

  if (!response.ok) {
    throw new Error('Error al obtener el estado de cuenta')
  }

  const data = await response.json()
  return data
}

export async function getPdfEstadoCta(idOrden: number) {
  const response = await fetch(`${API_URL}/generar-pdf`, {
    method: 'POST',
    body: JSON.stringify({ idOrden }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Error al obtener el PDF del estado de cuenta')
  }

  const data = await response.json()
  return data
}

export async function sendSms(rfc: string, idOrden: string) {
  const response = await fetch(`${API_URL}/send-sms`, {
    method: 'POST',
    body: JSON.stringify({ rfc, idOrden }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Error al enviar el SMS')
  }

  const data = await response.json()
  return data
}

export async function printEstadoCta(idOrden: number) {
  const response = await fetch(`${API_URL}/print`, {
    method: 'POST',
    body: JSON.stringify({ idOrden }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Error al imprimir el estado de cuenta')
  }

  const data = await response.json()
  return data
}
