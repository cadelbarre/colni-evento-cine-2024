import { NextResponse } from 'next/server'

export async function POST (request: Request) {
  try {
    const credencials = await request.json()

    if (
      credencials.username.toUpperCase() === process.env.USERNAME?.toUpperCase() &&
          credencials.password === process.env.PASSWORD) {
      return NextResponse.json('Credenciales correctas', {
        status: 200
      })
    } else {
      throw new Error('Usuario o contraseña incorrectos')
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, {
        status: 401
      })
    }
  }
}
