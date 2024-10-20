
export default function Badge ({
  payment = false
}: {
  payment: boolean
}): JSX.Element {
  const colors = {
    success: 'bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full',
    error: 'bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full'
  }
  return (
    <span className={payment ? colors.success : colors.error}>{
        payment ? 'Pagado' : 'No Pagado'
    }
    </span>
  )
}
