import { ChangeEvent, useState } from 'react'
import debounce from 'just-debounce'

import Badge from '@/app/components/badge'
import { UserData } from '@/types/user'
import Actions from './actions'
import { KeyedMutator } from 'swr'

export default function Table ({
  data,
  mutate
}: {
  data: UserData[]
  mutate: KeyedMutator<UserData[]>
}): JSX.Element {
  const [filtered, setFiltered] = useState<UserData[] | null>(null)

  const filteredData = debounce((e: ChangeEvent<HTMLInputElement>): void => {
    const targetValue = e.target.value

    /** Si el valor es vacio es porque se limpio el input */
    if (targetValue === '') {
      setFiltered(null)
      return
    }

    /** Filtramos teniendo en cuenta el valor de cada columna */
    const filteredData = data.filter(doctor => {
      const { id, name, email, cellphone, country, specialty, allergies } = doctor
      const search = `${id} ${name} ${email} ${cellphone} ${country} ${specialty} ${allergies ?? ''}`
      return search.toLowerCase().includes(targetValue.toLowerCase())
    })

    setFiltered(filteredData)
  }, 500)

  return (
    <>
      <div className='flex items-end justify-between'>
        <div className='flex items-center space-x-6'>
          <label className='flex flex-col'>
            Buscador
            <input
              type='search'
              name='search'
              id='search'
              autoFocus
              onChange={filteredData}
              className='max-w-md mt-2 px-3 py-2 text-gray-700  border border-gray-400 focus:border-indigo-600 shadow-sm rounded-lg bg-gray-50/30 disabled:bg-gray-100 disabled:cursor-wait'
            />
          </label>

          <ul className='mt-8 space-y-3'>
            <li className='flex items-center gap-x-1'>
              <input type='checkbox' name='role' defaultChecked id='admin' className='form-radio border-gray-400 text-indigo-600 focus:ring-indigo-600 duration-150' />
              <label htmlFor='admin' className='text-sm text-gray-700 font-medium'>
                Mostrar solo pagados
              </label>
            </li>
          </ul>
        </div>

        <div>
          <p className='text-sm font-semibold'>Total de registros: {data.length}</p>
        </div>
      </div>

      <div className='mt-10 shadow-sm border rounded-lg overflow-x-auto'>
        <table className='w-full table-auto text-sm text-left'>
          <thead className='bg-blue-800 text-white font-medium border-b'>
            <tr>
              <th className='py-3 px-4'>N°</th>
              <th className='py-3 px-4'>Cedula</th>
              <th className='py-3 px-4'>Nombre Completo</th>
              <th className='py-3 px-4'>Especialidad</th>
              <th className='py-3 px-4'>Pais</th>
              <th className='py-3 px-4'>Celular</th>
              <th className='py-3 px-4'>Email</th>
              <th className='py-3 px-4'>Alergias</th>
              <th className='py-3 px-4'>Pagos</th>
              <th className='py-3 px-4'>Acciones</th>
            </tr>
          </thead>
          <tbody className='text-gray-600 divide-y'>
            {
            (filtered ?? data).map((item, idx) => (
              <tr key={idx} className='odd:bg-gray-50 hover:bg-blue-50'>
                <td className='px-4 py-4 whitespace-nowrap '>{idx + 1}</td>
                <td className='px-4 py-4 whitespace-nowrap '>{item.nit}</td>
                <td className='px-4 py-4 whitespace-nowrap'>{item.name}</td>
                <td className='px-4 py-4 whitespace-nowrap'>{item.specialty}</td>
                <td className='px-4 py-4 whitespace-nowrap'>{item.country}</td>
                <td className='px-4 py-4 whitespace-nowrap'>{item.cellphone}</td>
                <td className='px-4 py-4 whitespace-nowrap'>{item.email}</td>
                <td className='px-4 py-4 whitespace-nowrap'>{item.allergies}</td>
                <td className='px-4 py-4 whitespace-nowrap'><Badge payment={item.payment} /></td>
                <td className='px-4 py-4 whitespace-nowrap'>
                  <Actions user={item} mutate={mutate} />
                </td>
              </tr>
            ))
        }
          </tbody>
        </table>
      </div>
    </>
  )
}
