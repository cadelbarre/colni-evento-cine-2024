import Link from 'next/link'
import { LeftSide, Form } from './components'

export default function Home (): JSX.Element {
  return (
    <main className='w-full flex'>

      <LeftSide />
      <div className='flex-1 flex items-start justify-center h-screen overflow-y-auto pb-20 pt-10'>

        <div className='w-full max-w-lg space-y-8 px-6 bg-white text-gray-600 sm:px-0'>

          <div className=''>

            <img src='https://colni.org/wp-content/uploads/2024/02/logo-colni.webp' width={150} loading='lazy' className='lg:hidden mx-auto' />
            <div className='flex justify-between items-center'>
              <div className='mt-5 space-y-2'>
                <h3 className='text-gray-800 text-2xl font-bold sm:text-3xl text-balance'>Formulario de Incripción - Colni Cine 2024</h3>
                <p className=''>¡Inscríbete y forma parte de la magia de &quot;Cine el Origen&quot;!</p>
              </div>
              <Link href='/admin' className='shadow grid place-content-center ml-2 px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg hover:-translate-y-1 transition-transform'>
                <svg width='24px' height='24px' strokeWidth='1.5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' color='currentColor'><path d='M16 12H17.4C17.7314 12 18 12.2686 18 12.6V19.4C18 19.7314 17.7314 20 17.4 20H6.6C6.26863 20 6 19.7314 6 19.4V12.6C6 12.2686 6.26863 12 6.6 12H8M16 12V8C16 6.66667 15.2 4 12 4C8.8 4 8 6.66667 8 8V12M16 12H8' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' /></svg>
              </Link>
            </div>
          </div>

          <div className='relative'>
            <span className='block w-full h-px bg-slate-300' />
          </div>

          <Form />

        </div>
      </div>
    </main>
  )
}
