import ExitIcon from '../icons/ExitIcon'

export default function ExitBtn({ exit }: { exit: () => void }) {
  return (
    <div className="absolute top-5 right-5" id="exit-btn">
      <button
        className="bg-red-500 text-white rounded-full p-3 shadow hover:bg-red-600 transition-colors cursor-pointer"
        onClick={exit}
      >
        <ExitIcon className="size-8" />
      </button>
      {/* <div
        className="bg-white px-2 py-1 font-semibold mt-2 text-sm text-center rounded-lg text-gray-800 hidden:          ;"
        id="exit-btn-tooltip"
      >
        Salir
      </div> */}
    </div>
  )
}
