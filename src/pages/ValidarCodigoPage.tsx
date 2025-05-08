import React, { useState } from 'react'

import { validarCodigo } from '../api/estado-cuenta.api'

interface Props {
  changePage: (page: string) => void
  currentUser: {
    nombre: string
    rfc: string
    celular: string
  }
}

export default function ValidarCodigoPage({ changePage, currentUser }: Props) {
  const [codigo, setCodigo] = useState('')

  async function handleValidarCodigo() {
    const { validarCodigoRequest } = validarCodigo()

    await validarCodigoRequest({
      rfc: currentUser.rfc,
      codigo: codigo
    })
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="card flex items-center flex-col">
          <h3 className="font-bold text-2xl w-full text-center">
            Introduce el código que se envió a tu celular
          </h3>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="border-1 text-lg rounded-xl px-3 py-2 mt-6 min-w-[300px]"
          />
          <div className="flex gap-3 mt-6">
            <button className="btn-secondary">Reenviar SMS</button>
            <button
              className="btn-primary"
              onClick={() => handleValidarCodigo()}
            >
              Validar código
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
