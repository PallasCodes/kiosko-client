import { useEffect, useState } from 'react'

export default function BuscarClientePage({
  getClientes
}: {
  getClientes: ({
    rfc,
    celular
  }: {
    rfc?: string
    celular?: string
  }) => Promise<void>
}) {
  const [rfc, setRfc] = useState('')
  const [celular, setCelular] = useState('')
  const [activeField, setActiveField] = useState('rfc')

  useEffect(() => {
    if (activeField === 'rfc') {
      setCelular('')
    } else {
      setRfc('')
    }
  }, [activeField])

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
              onFocus={() => setActiveField('rfc')}
            />
            <span className="font-bold text-2xl my-4">ó</span>
            <input
              type="text"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
              className="border-1 text-lg rounded-xl px-3 py-2"
              placeholder="Celular"
              onFocus={() => setActiveField('celular')}
            />

            <button
              className="btn-primary mt-6 w-full"
              onClick={() => getClientes({ rfc, celular })}
            >
              Consultar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
