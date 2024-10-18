import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import { prisma } from '@/utils/prisma'
import { UserData } from '@/types/user'

async function sendEmail (user: UserData): Promise<{ statusEmail: number, headers: HeadersInit | undefined, error: Error | null }> {
  await sgMail.setApiKey(process.env.SENGRID_API_KEY ?? '')

  const msg = {
    to: user.email,
    from: 'sac@effortiaweb.com', // Change to your verified sender
    subject: 'Confirmación participación de la 2da versión del CINE 2024',
    text: 'and easy to do anywhere, even with Node.js',
    html: `
   <div style="line-height:1.5; font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
      <div style="background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); background: url(https://colni.org/wp-content/uploads/2024/02/logo-colni.webp) no-repeat ; background-position: top 20px right 20px; background-size: 100px;">
        <h1 style="color: #333;">Confirmación de Inscripción</h1>
        <p>¡Gracias por inscribirte en la 2da versión del CINE!</p>
        <p>Hemos recibido tu inscripción y la hemos procesado con éxito. A continuación, te recordamos los detalles:</p>
        
        <h2 style="color: #2196F3;">Detalles de la Inscripción</h2>
        <ul style="margin: 20px 0; padding-left: 20px;">
            <li><strong>Nombre:</strong> ${user.name}</li>
            <li><strong>Email:</strong> ${user.email}</li>
            <li><strong>Fecha de Inscripción:</strong> ${new Date().toLocaleString()}</li>
        </ul>
        
        <h2 style="color: #2196F3;">Próximos Pasos</h2>
        <ol style="margin: 20px 0; padding-left: 20px;">
             <li>Realiza el pago correspondiente a la inscripción. A continuación, te enviaré los datos que necesitas para hacerlo efectivo:
                <div style="background-color: #e7f3fe; border-left: 4px solid #2196F3; padding: 10px; margin: 20px 0;">
                    <strong>Cuenta de Ahorros Bancolombia:</strong> <br>
                    # 96100000841<br>
                    <strong>Titular:</strong> Colegio Colombiano de Neurointervencionismo COLNI <br>
                    <strong>NIT:</strong> 901714862-4 <br>
                    <strong>Número de Banco:</strong> 7 <br>
                    <strong>Código Swift:</strong> COLOCOBM <br>
                    <strong>Valor a consignar:</strong> 200 dólares <br>
                    <strong>Valor en pesos colombiano:</strong> $800.000
                </div>
            </li>
            <li style="padding-bottom: 10px;">Envía el comprobante de pago a la siguiente dirección: <a href="mailto:colegioneurointervencionismo@gmail.com">colegioneurointervencionismo@gmail.com</a>.</li>
            <li>Espera 3 días hábiles tu volante de inscripción de vuelta.</li>
        </ol>

        <p>Si tienes alguna pregunta, no dudes en comunicarte con nosotros a través de nuestro número de WhatsApp: <strong>+573152619685</strong>.</p>
    </div>
    <div style="font-size: 0.9em; color: #555; margin-top: 20px;">
        <p>¡Esperamos verte pronto en el evento!</p>
    </div>
</div>
    `
  }

  try {
    const response = await sgMail.send(msg)

    console.log({ response })
    return {
      statusEmail: response[0].statusCode,
      headers: response[0].headers,
      error: null
    }
  } catch (error) {
    console.log({ error })

    return {
      statusEmail: 500,
      headers: undefined,
      error: error as Error
    }
  }
}

export async function POST (request: Request): Promise<NextResponse | undefined> {
  try {
    const body = await request.json()

    const created = await prisma.user.create({
      data: {
        ...body,
        payment: false
      }
    })

    const { headers } = await sendEmail(body)

    return NextResponse.json(created, {
      status: 201,
      headers
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, {
        status: 500
      })
    }
  }
}

export async function GET (): Promise<NextResponse | undefined> {
  try {
    const created = await prisma.user.findMany()

    return NextResponse.json(created, {
      status: 200
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, {
        status: 500
      })
    }
  }
}

export async function DELETE (request: Request): Promise<NextResponse | undefined> {
  try {
    const body = await request.json()

    const created = await prisma.user.delete({
      where: {
        name: body.name,
        email: body.email
      }
    })

    return NextResponse.json(created, {
      status: 200
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, {
        status: 500
      })
    }
  }
}

export async function PUT (request: Request): Promise<NextResponse | undefined> {
  try {
    const body = await request.json()

    const created = await prisma.user.update({
      data: {
        payment: body.payment
      },
      where: {
        name: body.name,
        email: body.email
      }
    })

    return NextResponse.json(created, {
      status: 200
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, {
        status: 500
      })
    }
  }
}
