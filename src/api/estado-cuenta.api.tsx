export function buscarCliente() {
  async function buscarClienteRequest(rfc = '', celular = '') {
    const response = await fetch(
      `http://localhost:3000/api/estado-cuenta/info-cliente?rfc=${rfc}&celular=${celular}`
    )

    const data = await response.json()

    return data
  }

  return { buscarClienteRequest }
}
