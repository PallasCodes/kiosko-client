import { useState } from 'react'

const API_URL = 'http://localhost:3000/api/estado-cuenta'

export const buscarCliente = () => {
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState(false)

  const buscarClienteRequest = async (rfc = '', celular = '') => {
    // setIsLoading(true)

    const response = await fetch(
      `${API_URL}/info-cliente?rfc=${rfc}&celular=${celular}`
    )

    // setIsLoading(false)

    if (!response.ok) {
      // setError(true)
      return
    }

    const data = await response.json()
    return data
  }

  return {
    buscarClienteRequest
    // isLoading, error
  }
}

export function validarCodigo() {
  async function validarCodigoRequest({
    rfc,
    codigo
  }: {
    rfc: string
    codigo: string
  }) {
    // setIsLoading(true)

    const response = await fetch(`${API_URL}/validar-codigo`, {
      method: 'POST',
      body: JSON.stringify({ codigo, rfc }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // setIsLoading(false)

    if (!response.ok) {
      // setError(true)
      return
    }
  }

  return {
    validarCodigoRequest
    // , isLoading, error
  }
}

export function enviarCodigo() {
  async function enviarCodigoRequest({
    rfc,
    celular
  }: {
    rfc: string
    celular: string
  }) {
    // setIsLoading(true)

    const response = await fetch(`${API_URL}/enviar-codigo`, {
      method: 'POST',
      body: JSON.stringify({ rfc, celular }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // setIsLoading(false)

    if (!response.ok) {
      // setError(true)
      return
    }
  }

  return {
    enviarCodigoRequest
    // , isLoading, error
  }
}
