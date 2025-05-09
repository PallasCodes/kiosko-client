import ExitIcon from '../icons/ExitIcon'

export default function ExitBtn({ exit }: { exit: () => void }) {
  return (
    <div className="absolute top-5 right-5">
      <button
        className="bg-red-500 text-white rounded-full p-3 shadow hover:bg-red-600 transition-colors cursor-pointer"
        onClick={exit}
      >
        <ExitIcon className="size-8" />
      </button>
    </div>
  )
}
