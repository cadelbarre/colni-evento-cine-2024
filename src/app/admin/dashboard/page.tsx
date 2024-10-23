'use client'
import { useEffect } from 'react'
import useSWR, { Fetcher } from 'swr'
import { useRouter } from 'next/navigation'

import { useAuthStore } from './store/auth-store'
import { UserData } from '@/types/user'

import Navbar from './components/navbar'
import Table from './components/table'
import SkeletonTable from './components/skeleton-table'

const fetcher: Fetcher<UserData[], string> = async (...args) => await fetch(...args).then(async res => await res.json())

export default function Dashboard (): JSX.Element {
  const { isAuth } = useAuthStore()
  const { data, isLoading, mutate } = useSWR('/api/users', fetcher)
  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push('/admin')
    }
  }, [])

  if (!isAuth) {
    return (
      <main>
        <div className='max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8'>
          <div className='max-w-lg mx-auto text-center'>
            <h3 className='text-gray-800 text-4xl font-semibold sm:text-5xl'>
              Validando información
            </h3>
            <p className='text-gray-600 mt-3 mb-8'>
              Estamos validando las credenciales de tu cuenta.
            </p>
            <div className='grid place-content-center'>
              <svg className='spinner' viewBox='0 0 50 50'>
                <circle className='path' cx='25' cy='25' r='20' fill='none' strokeWidth='5' />
              </svg>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className='flex flex-col w-full'>
      <Navbar className='col-span-2' />
      <div className='p-4 md:p-8 col-span-10 overflow-y-auto h-screen'>
        {
            isLoading
              ? <SkeletonTable />
              : <Table data={data ?? []} mutate={mutate} />
        }
      </div>
    </main>
  )
}
