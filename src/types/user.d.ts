import { FieldValuesTypes } from '@/app/model'

export interface UserData extends FieldValuesTypes {
  id: number
  payment: boolean
}

export interface ResponseUserData {
  status: 'success' | 'error'
  data: Error | null | undefined | UserData
}
