import { useEffect, useState } from 'react'
import Printer from '../icons/Printer'
import { formatDate, numberToCurrency } from '../utils/format'
import Dialog from '../components/Dialog'

interface Props {
  changePage: (page: string) => void
  currentUser: {
    nombre: string
    rfc: string
    celular: string
  }
  estadosCta: EstadoCtaTableRow[]
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
  estadosCta
}: Props) {
  const [isDialogOpen, setDialogOpen] = useState(false)

  function handleClickImprimir() {
    setDialogOpen(true)
  }

  useEffect(() => {
    console.log(estadosCta)
  }, [estadosCta])

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
                      className="text-white bg-green-600 rounded-full px-3 py-1 flex items-center cursor-pointer hover:bg-green-700 transition-colors"
                      onClick={handleClickImprimir}
                    >
                      <Printer className="size-5" />
                      <span className="ml-1 text-sm font-semibold">
                        Imprimir
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
        title="Imprimir estado de cuenta"
      >
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis
          deserunt, nihil dicta vero odit voluptate molestias soluta?
          Perferendis voluptatem a vel nostrum at tempora impedit hic non cumque
          mollitia. Neque.
        </p>
      </Dialog>
    </div>
  )
}
