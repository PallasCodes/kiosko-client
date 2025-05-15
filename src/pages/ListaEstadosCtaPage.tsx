import { useState } from 'react'

import {
  getPdfEstadoCta,
  printEstadoCta,
  sendSms
} from '../api/estado-cuenta.api'
import { formatDate, numberToCurrency } from '../utils/format'

import Dialog from '../components/Dialog'
import EyeIcon from '../icons/EyeIcon'
import MobilePhoneIcon from '../icons/MobilePhoneIcon'
import Printer from '../icons/Printer'

interface Props {
  changePage: (page: string) => void
  currentUser: {
    nombre: string
    rfc: string
    celular: string
  }
  estadosCta: EstadoCtaTableRow[]
  setLoading: (loading: boolean) => void
}

export interface EstadoCtaTableRow {
  folioInterno: string
  nombreCliente: string
  convenio: string
  fechaVenta: Date
  idProductoScc: number
  producto: string
  estatus: string
  importe: string
  rfc: string
  orden: number
  jasperAUsar: number
  enlaceAsesor: string
  ea: number
  promocion: string
}

export default function ListaEstadosCtaPage({
  currentUser,
  estadosCta,
  setLoading
}: Props) {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [pdfUrl, setPdfUrl] = useState('')
  const [estadoCtaSeleccionado, setEstadoCtaSeleccionado] =
    useState<EstadoCtaTableRow | null>(null)

  async function handleClickImprimir(idOrden: number) {
    try {
      setLoading(true)
      setEstadoCtaSeleccionado(
        estadosCta.find((e) => e.orden === idOrden) || null
      )
      const { pdfUrl } = await getPdfEstadoCta(idOrden)
      setPdfUrl(pdfUrl)
      setDialogOpen(true)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSendSms() {
    try {
      setLoading(true)
      await sendSms(
        estadoCtaSeleccionado?.rfc as string,
        estadoCtaSeleccionado?.orden as unknown as string
      )
    } catch (error) {
      console.error('Error al enviar el SMS:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleImprimir() {
    try {
      setLoading(true)
      await printEstadoCta(
        estadoCtaSeleccionado?.orden as unknown as number,
        pdfUrl
      )
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center">
      <div className="card min-w-7xl">
        <h3 className="font-bold text-2xl w-full text-center">
          {currentUser.nombre} - {currentUser.rfc}
        </h3>

        <table id="estadosCta" className="w-full mt-6 table-auto">
          <thead>
            <tr>
              <th className="text-left">No. </th>
              <th className="text-left">Folio interno</th>
              <th className="text-left">Convenio</th>
              <th className="text-left">Fecha venta</th>
              <th className="text-left">Producto</th>
              <th className="text-left">Estatus</th>
              <th className="text-left">Importe</th>
              <th className="text-left">Promociones disponibles</th>
              <th className="text-left"></th>
            </tr>
          </thead>
          <tbody>
            {estadosCta &&
              estadosCta?.map((estadoCta, index) => (
                <tr key={`estado-${index}`}>
                  <td>{index + 1}</td>
                  <td>{estadoCta.folioInterno}</td>
                  <td>{estadoCta.convenio}</td>
                  <td>{formatDate(new Date(estadoCta.fechaVenta))}</td>
                  <td>{estadoCta.producto}</td>
                  <td>{estadoCta.estatus}</td>
                  <td>{numberToCurrency(+estadoCta.importe)}</td>
                  <td>{estadoCta.promocion}</td>
                  <td>
                    <button
                      className="text-white bg-blue-600 rounded-full px-3 py-1 flex items-center cursor-pointer hover:bg-blue-700 transition-colors"
                      onClick={() => handleClickImprimir(estadoCta.orden)}
                    >
                      <EyeIcon className="size-5" />
                      <span className="text-sm font-semibold ml-1">
                        Visualizar
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        title={`Estado de cuenta - ${estadoCtaSeleccionado?.folioInterno} - ${currentUser.nombre}`}
      >
        <div className="flex gap-2 mb-4">
          <button
            className="text-white bg-green-600 rounded-full px-3 py-1 flex items-center cursor-pointer hover:bg-green-700 transition-colors"
            onClick={handleImprimir}
          >
            <Printer className="size-5" />
            <span className="ml-1 text-sm font-semibold">Imprimir</span>
          </button>
          <button
            className="text-white bg-blue-600 rounded-full px-3 py-1 flex items-center cursor-pointer hover:bg-blue-700 transition-colors"
            onClick={handleSendSms}
          >
            <MobilePhoneIcon className="size-5" />
            <span className="ml-1 text-sm font-semibold">Enviar por SMS</span>
          </button>
        </div>
        <iframe
          src={`${pdfUrl}#toolbar=0&zoom=135`}
          className="w-full min-h-[78vh]"
        ></iframe>
      </Dialog>
    </div>
  )
}
