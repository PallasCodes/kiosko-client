import { enviarCodigo } from '../api/cliente.api'

interface Props {
  changePage: (page: string) => void
  currentUser: {
    nombre: string
    rfc: string
    celular: string
  }
}

export default function ConfirmarDatosPage({ changePage, currentUser }: Props) {
  async function handleConfirmarDatos() {
    try {
      await enviarCodigo({
        rfc: currentUser.rfc,
        celular: currentUser.celular
      })
      changePage('validarCodigo')
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <>
      <h1 className="w-full text-center text-4xl font-bold text-white uppercase">
        Consultar estado de cuenta
      </h1>

      <div className="flex justify-center">
        <div className="card inline-block mx-auto">
          <h3 className="font-bold text-2xl w-full text-center">
            ¿Son correctos sus datos?
          </h3>
          <div className="font-bold mt-4">Nombre</div>
          <div>{currentUser.nombre}</div>
          <div className="font-bold mt-2">RFC</div>
          <div>{currentUser.rfc}</div>
          <div className="font-bold mt-2">Celular</div>
          <div>{currentUser.celular}</div>
          <div className="flex mt-5 gap-3">
            <button className="bg-red-500 text-white font-bold text-xl grow-1 pb-1 pt-2 rounded-full cursor-pointer hover:bg-red-600 transition-colors">
              NO
            </button>
            <button
              className="btn bg-green-600 text-white font-bold text-xl grow-1 pb-1 pt-2 rounded-full cursor-pointer hover:bg-green-700 transition-colors"
              onClick={handleConfirmarDatos}
            >
              SI
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
