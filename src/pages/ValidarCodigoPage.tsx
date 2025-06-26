import { useEffect, useRef, useState } from 'react'

interface Props {
  reenviarSms: (rfc: string, celular: string) => Promise<void>
  validarCodigo: (rfc: string, codigo: string) => Promise<void>
  currentUser: {
    nombre: string
    rfc: string
    celular: string
  }
}

export default function ValidarCodigoPage({
  validarCodigo,
  currentUser,
  reenviarSms
}: Props) {
  const [codigo, setCodigo] = useState('')
  const [timeLeft, setTimeLeft] = useState(60)
  const [disabledSmsBtn, setDisabledSmsBtn] = useState(true)

  const intervalRef = useRef<any>(null)
  const timeoutRef = useRef<any>(null)

  const startCountdown = () => {
    setDisabledSmsBtn(true)
    setTimeLeft(60)

    // Limpiar timers anteriores si existen
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    timeoutRef.current = setTimeout(() => {
      setDisabledSmsBtn(false)
    }, 60000)
  }

  useEffect(() => {
    startCountdown()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleResendClick = async () => {
    await reenviarSms(currentUser.rfc, currentUser.celular)
    setCodigo('')
    startCountdown()
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
            className="border-1 text-lg rounded-xl px-3 py-2 mt-10 mb-8 min-w-[300px]"
          />
          <div className="flex gap-3 w-full">
            <div className="flex flex-col w-1/2">
              <button
                className={`btn-secondary ${
                  disabledSmsBtn ? 'opacity-50 cursor-not-allowed!' : ''
                }`}
                disabled={disabledSmsBtn}
                onClick={handleResendClick}
              >
                Reenviar SMS
              </button>
              {timeLeft > 0 && (
                <span className="text-sm text-gray-900 text-center mt-2 italic text-gray-900">
                  Espera {timeLeft} segundos para poder reenviar el código
                </span>
              )}
            </div>
            <button
              className="btn-primary w-1/2 h-min"
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
