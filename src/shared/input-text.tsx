'use client'
import { FieldValuesTypes } from '@/app/model'
import { InputHTMLAttributes } from 'react'
import { Control, Controller, FieldError } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: keyof FieldValuesTypes
  label: string
  control: Control<FieldValuesTypes>
  error?: FieldError
}

export default function InputText ({
  label,
  name,
  error,
  control,
  type = 'text',
  required = false,
  ...attr
}: Props): JSX.Element {
  return (
    <div>
      <label className='text-gray-700'>
        {label} {required && <span className='text-red-500'>*</span>}
        <Controller
          name={name}
          control={control}
          render={({ field }) => <input
            type={type}
            {...field}
            placeholder=''
            required={required}
            {...attr}
            className={`w-full mt-2 px-3 py-2 text-gray-700  border focus:border-indigo-600 shadow-sm rounded-lg bg-gray-50/30 disabled:bg-gray-100 disabled:cursor-wait ${error != null ? 'border-rose-400' : ''}`}
                                 />}
        />
      </label>
      {
        (error != null) && <p className='pt-2 text-sm text-rose-400 italic'>{error.message}</p>
      }
    </div>
  )
}
