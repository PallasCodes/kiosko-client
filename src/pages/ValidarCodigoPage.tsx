import React from 'react'

export default function ValidarCodigoPage({
  changePage
}: {
  changePage: (page: string) => void
}) {
  return (
    <>
      <div className="flex justify-center">
        <div className="card flex items-center flex-col">
          <h3 className="font-bold text-2xl w-full text-center">
            Introduce el código que se envió a tu celular
          </h3>
          <input
            type="text"
            name=""
            id=""
            className="border-1 text-lg rounded-xl px-3 py-2 mt-6 min-w-[300px]"
          />
          <div className="flex gap-3 mt-6">
            <button className="btn-secondary">Reenviar SMS</button>
            <button className="btn-primary">Validar código</button>
          </div>
        </div>
      </div>
    </>
  )
}
