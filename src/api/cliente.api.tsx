const API_URL = 'http://localhost:3000/api/cliente'

export async function buscarCliente({
  rfc,
  celular
}: {
  rfc: string
  celular: string
}) {
  const response = await fetch(
    `${API_URL}/buscar-cliente?rfc=${rfc}&celular=${celular}`
  )

  if (!response.ok) {
    throw new Error('Error al buscar el cliente')
  }

  const data = await response.json()
  return data
}

export async function validarCodigo({
  rfc,
  codigo
}: {
  rfc: string
  codigo: string
}) {
  const response = await fetch(`${API_URL}/validar-codigo`, {
    method: 'POST',
    body: JSON.stringify({ codigo, rfc }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
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
  const response = await fetch(`${API_URL}/enviar-codigo`, {
    method: 'POST',
    body: JSON.stringify({ rfc, celular }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error('Error al enviar el código')
  }
}
