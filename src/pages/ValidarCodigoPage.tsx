import { useState } from 'react'

interface Props {
  validarCodigo: (rfc: string, codigo: string) => Promise<void>
  currentUser: {
    nombre: string
    rfc: string
    celular: string
  }
}

export default function ValidarCodigoPage({
  validarCodigo,
  currentUser
}: Props) {
  const [codigo, setCodigo] = useState('')

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
            className="border-1 text-lg rounded-xl px-3 py-2 mt-10 mb-8 min-w-[300px]"
          />
          <div className="flex gap-3 ">
            <button className="btn-secondary">Reenviar SMS</button>
            <button
              className="btn-primary"
              onClick={() => validarCodigo(currentUser.rfc, codigo)}
            >
              Validar código
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
