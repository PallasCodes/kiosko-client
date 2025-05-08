import React, { useState } from 'react'
import { buscarCliente } from '../api/estado-cuenta.api'

interface Props {
  changePage: (page: string) => void
  setCurrentUser: (user: {
    nombre: string
    rfc: string
    celular: string
  }) => void
}

export default function BuscarClientePage({
  changePage,
  setCurrentUser
}: Props) {
  const [rfc, setRfc] = useState('')

  async function onClickConsultar() {
    const { buscarClienteRequest } = buscarCliente()

    const cliente = await buscarClienteRequest(rfc)

    setCurrentUser(cliente)
    changePage('confirmarDatos')
  }

  return (
    <>
      <h1 className="w-full text-center text-4xl font-bold text-white uppercase">
        Consultar estado de cuenta
      </h1>

      <div className="flex justify-center">
        <div className="inline-flex mx-auto pt-10 card flex-col items-center">
          <h3 className="font-bold text-2xl w-full text-center">
            Ingrese su RFC o celular
          </h3>

          <div className="flex flex-col items-center">
            <input
              type="text"
              value={rfc}
              onChange={(e) => setRfc(e.target.value)}
              className="border-1 text-lg rounded-xl px-3 py-2 mt-6"
              placeholder="RFC"
            />
            <span className="font-bold text-2xl my-4">ó</span>
            <input
              type="text"
              name=""
              id=""
              className="border-1 text-lg rounded-xl px-3 py-2"
              placeholder="Celular"
            />

            <button
              className="btn-primary mt-6"
              onClick={() => onClickConsultar()}
            >
              Consultar información
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
