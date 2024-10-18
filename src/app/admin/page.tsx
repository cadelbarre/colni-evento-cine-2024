'use client'
import { FormEvent } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import InputPassword from '@/shared/input-password'
import { useAuthStore } from './dashboard/store/auth-store'

export default function Index (): JSX.Element {
  const router = useRouter()
  const { available } = useAuthStore()

  const login = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const credencials = Object.fromEntries(formData) as { username: string, password: string }

    const body = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credencials)
    })

    const json = await body.json()

    if (body.status === 200) {
      available(true)
      router.push('/admin/dashboard')
    }
    if (body.status === 401) toast.error(json.message)
  }

  return (
    <main className='w-full h-screen flex flex-col items-center justify-center px-4'>
      <div className='max-w-sm w-full text-gray-600'>
        <div className='text-center'>
          <img src='https://colni.org/wp-content/uploads/2024/02/logo-colni.webp' width={150} className='mx-auto' loading='lazy' />
          <div className='mt-5 space-y-2'>
            <h3 className='text-gray-800 text-2xl font-bold sm:text-3xl'>Iniciar sesion con tu cuenta</h3>
          </div>
        </div>

        <form
          onSubmit={login}
          className='mt-8 space-y-5'
          id='login-form'
        >
          <label className='font-medium'>
            Usuario
            <input
              type='text'
              required
              name='username'
              autoFocus
              className='w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
            />
          </label>

          <InputPassword
            label='Contraseña'
            name='password'
            required
          />
        </form>

        <button
          className='w-full mt-10 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150'
          type='submit'
          form='login-form'
        >
          Ingresar
        </button>
      </div>
    </main>
  )
}
