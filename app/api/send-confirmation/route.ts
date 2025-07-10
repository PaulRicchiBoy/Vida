import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { customer, payment, plan } = await request.json()

    // Send confirmation email to customer
    const emailContent = generateConfirmationEmail(customer, payment, plan)

    console.log(`Sending confirmation to ${customer.email}:`, emailContent.subject)

    // In production, integrate with your email service
    // Similar to the notification endpoint

    return NextResponse.json({ message: "Confirmation sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Confirmation error:", error)
    return NextResponse.json({ error: "Failed to send confirmation" }, { status: 500 })
  }
}

function generateConfirmationEmail(customer: any, payment: any, plan: string) {
  const planNames = {
    condor: { en: "Condor Path", es: "Sendero Cóndor" },
    puma: { en: "Puma Path", es: "Sendero Puma" },
    serpent: { en: "Serpent Path", es: "Sendero Serpiente" },
  }

  return {
    subject: `Welcome to VIDA Wellness Center! / ¡Bienvenido a VIDA Wellness Center!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">¡Bienvenido a VIDA!</h1>
          <h2 style="color: white; margin: 10px 0; font-size: 24px;">Welcome to VIDA!</h2>
        </div>
        
        <div style="padding: 40px; background: white;">
          <h2 style="color: #374151;">Hola ${customer.name} / Hello ${customer.name}!</h2>
          
          <p style="font-size: 16px; line-height: 1.6;">
            <strong>Español:</strong> ¡Gracias por unirte a nuestra comunidad sagrada de bienestar! 
            Tu membresía ${planNames[plan as keyof typeof planNames]?.es} ha sido activada exitosamente.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6;">
            <strong>English:</strong> Thank you for joining our sacred wellness community! 
            Your ${planNames[plan as keyof typeof planNames]?.en} membership has been successfully activated.
          </p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0369a1; margin-top: 0;">Detalles de tu Membresía / Membership Details</h3>
            <p><strong>Plan:</strong> ${planNames[plan as keyof typeof planNames]?.es} / ${planNames[plan as keyof typeof planNames]?.en}</p>
            <p><strong>Payment ID:</strong> ${payment.id}</p>
            <p><strong>Amount:</strong> $${payment.amount / 100}</p>
            <p><strong>Status:</strong> Active / Activo</p>
          </div>
          
          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #059669; margin-top: 0;">Próximos Pasos / Next Steps</h3>
            <ul style="line-height: 1.8;">
              <li>Visita nuestro centro en el Valle Sagrado / Visit our center in the Sacred Valley</li>
              <li>Descarga nuestra app móvil / Download our mobile app</li>
              <li>Reserva tu primera clase / Book your first class</li>
              <li>Únete a nuestra comunidad en redes sociales / Join our social media community</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #6b7280;">
              Valle Sagrado, Cusco, Perú<br>
              +51 984 123 456<br>
              hola@vidawellness.pe
            </p>
          </div>
        </div>
        
        <div style="background: #374151; padding: 20px; text-align: center;">
          <p style="color: #9ca3af; margin: 0;">
            VIDA Wellness Center - Transformando vidas / Transforming lives
          </p>
        </div>
      </div>
    `,
  }
}
