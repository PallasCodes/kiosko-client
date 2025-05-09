import loader from '../assets/spinning-loader.svg'

export default function SpinningLoader() {
  return (
    <div className="absolute w-screen h-screen bg-[rgba(0,0,0,0.4)] top-0 left-0 flex items-center justify-center z-10">
      <img src={loader} alt="Cargando..." />
    </div>
  )
}
