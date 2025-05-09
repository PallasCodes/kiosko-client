const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN'
})

const dateFormatter = new Intl.DateTimeFormat()

export function numberToCurrency(number: number) {
  try {
    return currencyFormatter.format(number)
  } catch (error: any) {
    return 0
  }
}

export function formatDate(date: Date) {
  try {
    return date.toLocaleDateString()
  } catch (error: any) {
    return ''
  }
}
