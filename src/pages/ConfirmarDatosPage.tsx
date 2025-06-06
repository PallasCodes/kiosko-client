interface Props {
  confirmarDatos: (rfc: string, celular: string) => Promise<void>
  currentUser: {
    nombre: string
    rfc: string
    celular: string
  }
  changePage: (page: string) => void
}

export default function ConfirmarDatosPage({
  confirmarDatos,
  currentUser,
  changePage
}: Props) {
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
            <button className="bg-red-500 text-white font-bold text-xl grow-1 pb-1 pt-2 rounded-full cursor-pointer hover:bg-red-600 transition-colors" onClick={() => changePage('404cliente')}>
              NO
            </button>
            <button
              className="btn bg-green-600 text-white font-bold text-xl grow-1 pb-1 pt-2 rounded-full cursor-pointer hover:bg-green-700 transition-colors"
              onClick={() =>
                confirmarDatos(currentUser.rfc, currentUser.celular)
              }
            >
              SI
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
