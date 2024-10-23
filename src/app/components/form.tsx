'use client'
import { useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import swal from 'sweetalert'

import { FieldValuesTypes, schemaForm } from '../model'
import InputText from '@/shared/input-text'

import { countries } from '@/data/countries'

const INITIAL_VALUES = {
  name: '',
  nit: '',
  email: '',
  cellphone: '',
  country: '',
  specialty: '',
  allergies: ''
}

export const sendEmail = async (body: FieldValuesTypes): Promise<void> => {
  const data = {
    service_id: 'service_vjt65x6',
    template_id: 'template_j77o7yp',
    user_id: 'IF0IZ6pmHpB4Jw65s',
    template_params: {
      ...body,
      reply_to: 'colegioneurointervencionismo@gmail.com',
      fecha: new Date().toLocaleString()
    }
  }

  await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async () => {
    await swal('Correo Enviado!', 'Se ha enviado un correo con la confirmación de la inscripción al evento. Siga los pasos que se indican para completar el proceso.', 'success')
  })
}

export default function Form (): JSX.Element {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FieldValuesTypes>({
    resolver: zodResolver(schemaForm),
    defaultValues: INITIAL_VALUES
  })

  const contriesEs = useMemo(() => countries.map(c => c.es_name), [])

  const onSubmit = async (data: FieldValuesTypes): Promise<void> => {
    const body = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (body.ok) {
      toast.success('Usuario registrado exitosamente')
      await sendEmail(data)
      reset()
    } else {
      const json = await body?.json()
      toast.error(json.message)
      toast.error('Error al registrar el usuario')
    }
  }

  return (
    <fieldset disabled={isSubmitting} className='space-y-10'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-5'
        id='form-inscription'
      >

        <InputText
          label='Nombre Completo'
          autoFocus
          name='name'
          control={control}
          error={errors.name}
        />
        <InputText
          label='Identification'
          name='nit'
          control={control}
          error={errors.nit}
        />
        <InputText
          label='Correo Electrónico'
          type='email'
          name='email'
          autoComplete='true'
          control={control}
          error={errors.email}
        />
        <InputText
          label='Número Celular'
          name='cellphone'
          control={control}
          error={errors.cellphone}
        />
        <InputText
          label='Especialidad'
          name='specialty'
          autoComplete='true'
          control={control}
          error={errors.specialty}
        />
        <InputText
          label='Pais'
          name='country'
          list='countries'
          autoComplete='true'
          control={control}
          error={errors.country}
        />

        <datalist id='countries'>
          {
            contriesEs.map(c => <option key={c} value={c} />)
          }
        </datalist>

        <InputText
          label='¿Posee alguna alergia?'
          placeholder='Ej. Polen, Penicilina, Camaron, etc.'
          name='allergies'
          control={control}
          error={errors.allergies}
        />

      </form>

      <button
        className='w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-600 rounded-lg duration-150 disabled:bg-indigo-800 disabled:cursor-not-allowed'
        form='form-inscription'
        type='submit'
      >
        Reservar cupo
      </button>
    </fieldset>
  )
}
