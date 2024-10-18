import { capitalize } from '@/utils/sanitize'
import { z } from 'zod'

export const schemaForm = z.object({
  name: z
    .string()
    .min(1, { message: 'El nombre es requerido' })
    .transform(value => capitalize(value.trim())),
  nit: z.string()
    .min(1, { message: 'La cedula es requerida' })
    .transform(value => value.trim()),
  email: z
    .string()
    .min(1, { message: 'El correo es requerido' })
    .email({ message: 'El correo es inválido' })
    .transform(value => value.trim()),
  cellphone: z
    .string()
    .min(1, { message: 'El teléfono es requerido' })
    .transform(value => value.trim().replace(/\D/g, '')),
  country: z
    .string()
    .min(1, { message: 'El país es requerido' })
    .transform(value => capitalize(value.trim())),
  specialty: z
    .string()
    .min(1, { message: 'La especialidad es requerida' })
    .transform(value => capitalize(value.trim())),
  allergies: z.string().optional()
})

export type FieldValuesTypes = z.infer<typeof schemaForm>
