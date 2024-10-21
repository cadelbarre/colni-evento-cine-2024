import { twMerge } from 'tailwind-merge'
import { useAuthStore } from '../store/auth-store'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const navigation = [
  {
    href: '#',
    name: 'Tabla Doctores',
    icon:
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
    <path strokeLinecap='round' strokeLinejoin='round' d='M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122' />
  </svg>
  }
]

export default function Navbar ({ className }: { className: string }): JSX.Element {
  const { available } = useAuthStore()
  const router = useRouter()

  const logout = async (): Promise<void> => {
    available(false)
    router.push('/admin')
  }

  return (
    <nav
      className={twMerge('w-screen h-20 border-r bg-white space-y-8', className)}
    >
      <div className='flex flex-row h-full items-center justify-between px-4'>

        <div className=' h-20 flex items-center pl-2'>
          <div className='w-full flex items-center gap-x-4'>
            <img
              src='data:image/jpeg;base64,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'
              alt='foto coordinadora estrella'
              loading='lazy'
              title='Kelly Llorente - Coordinadora Estrella'
              className='size-12 rounded-full'
            />
            <div>
              <span className='block text-gray-700 text-sm font-semibold'>Kelly Llorente</span>
              <span
                className='block mt-px text-gray-600 text-xs'
              >
                Coordinadora Estrella
              </span>
            </div>

          </div>
        </div>

        <div className='flex items-center'>
          <ul className='text-sm font-medium'>
            {
              navigation.map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className='flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150 text-xs md:text-base'>
                    <div className='text-gray-500'>{item.icon}</div>
                    {item.name}
                  </a>
                </li>
              ))
          }
          </ul>

          <div className=''>
            <ul className='text-xs md:text-base font-medium'>
              <li onClick={logout}>
                <a href='#' className='w-full flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150'>
                  <div className='text-gray-500'>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z' />
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                    </svg>
                  </div>
                  Cerrar Sesion
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
