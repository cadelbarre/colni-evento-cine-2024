'use client'
import { toast } from 'sonner'
import { UserData } from '@/types/user'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ChevronDownIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/16/solid'
import { KeyedMutator } from 'swr'
import swal from 'sweetalert'

export default function Actions ({ user, mutate }: { user: UserData, mutate: KeyedMutator<UserData[]> }): JSX.Element {
  const showWarning = async (action: 'edit' | 'delete'): Promise<void> => {
    await swal({
      title: '¿Seguro/a que deseas hacer esta acción?',
      text: action === 'edit' ? 'El usuario se actualizará' : 'El usuario se eliminará permanentemente',
      icon: 'warning',
      buttons: ['Cancelar', action === 'edit' ? 'Actualizar' : 'Eliminar'],
      dangerMode: action === 'delete'

    }).then(async (willDelete: boolean) => {
      if (willDelete) {
        await manageUser(action)
        await swal(
          action === 'edit' ? 'Actualizado!' : 'Eliminado!',
          action === 'edit' ? 'El usuario ha sido actualizado correctamente' : 'El ususario ha sido eliminado correctamente',
          'success')
      }
    })
  }

  const manageUser = async (action: 'edit' | 'delete'): Promise<void> => {
    const data = {
      ...user,
      ...(action === 'edit' && { payment: !user.payment })
    }

    const body = await fetch('/api/users', {
      method: action === 'edit' ? 'PUT' : 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const json = await body.json()

    if (body.ok) {
      toast.success(action === 'edit' ? 'Usuario actualizado exitosamente' : 'Usuario eliminado exitosamente')
      await mutate()
    } else {
      toast.error(json.message)
      toast.error(action === 'edit' ? 'Error al actualizar el usuario' : 'Error al eliminar el usuario')
    }
  }

  return (
    <Menu>
      <MenuButton className='inline-flex items-center gap-2 rounded-md bg-blue-50 py-1.5 px-3 text-sm/6 font-semibold text-blue-600 shadow shadow-black/10 focus:outline-none data-[hover]:bg-blue-700 data-[open]:bg-blue-700  data-[open]:text-white data-[focus]:outline-1 data-[focus]:outline-white hover:text-white group'>
        Acciones
        <ChevronDownIcon className='size-4 fill-gray-600 group-hover:fill-white' />
      </MenuButton>

      <MenuItems
        transition
        anchor='bottom end'
        className='w-52 origin-top-right rounded-xl border border-gray-300 bg-white p-1 text-sm/6 text-gray-600 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0'
      >
        <MenuItem>
          <button onClick={async () => await showWarning('edit')} className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-blue-100'>
            <PencilIcon className='size-4 fill-gray-600' />
            Pagó
          </button>
        </MenuItem>
        <div className='my-1 h-px bg-gray-200' />
        <MenuItem>
          <button onClick={async () => await showWarning('delete')} className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-rose-500 hover:text-white group'>
            <TrashIcon className='size-4 fill-gray-600 group-hover:fill-white' />
            Eliminar
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>

  )
}
