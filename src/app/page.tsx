
import { LeftSide, Form } from './components'

export default function Home (): JSX.Element {
  return (
    <main className='w-full flex'>

      <LeftSide />
      <div className='flex-1 flex items-start justify-center h-screen overflow-y-auto pb-20 pt-10'>

        <div className='w-full max-w-lg space-y-8 px-6 bg-white text-gray-600 sm:px-0'>

          <div className=''>
            <img src='https://colni.org/wp-content/uploads/2024/02/logo-colni.webp' width={150} loading='lazy' className='lg:hidden mx-auto' />
            <div className='mt-5 space-y-2'>
              <h3 className='text-gray-800 text-2xl font-bold sm:text-3xl text-balance'>Formulario de Incripción - Colni Cine 2024</h3>
              <p className=''>¡Inscríbete y forma parte de la magia de &quot;Cine el Origen&quot;!</p>
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
