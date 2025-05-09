import logoSrc from '../assets/intermercado-logo.png'

export default function HomePage({
  changePage
}: {
  changePage: (page: string) => void
}) {
  return (
    <div className="flex h-screen">
      <div className="w-2/3 flex flex-col items-center justify-center">
        <h1 className="font-bold text-6xl text-center text-white w-full mb-16">
          Bienvenido <br />
          ¿Qué deseas hacer?
        </h1>
        <div className="flex flex-col text-xl">
          <button
            className="btn-primary"
            onClick={() => changePage('buscarCliente')}
          >
            Consultar mis estados de cuenta
          </button>
          <button className="btn-primary mt-5">Precalificarme</button>
        </div>
      </div>
      <div className="bg-white w-1/3 px-24 flex items-center justify-center">
        <img src={logoSrc} alt="Logo de Intermercado" className="my-auto" />
      </div>
    </div>
  )
}
