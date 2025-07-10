import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { type, data, to } = await request.json()

    // Email configuration (you would use a service like SendGrid, Resend, etc.)
    const emailContent = generateEmailContent(type, data)

    // Simulate email sending
    console.log(`Sending ${type} notification to ${to}:`, emailContent)

    // In production, integrate with your email service:
    /*
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: to }],
          subject: emailContent.subject
        }],
        from: { email: 'noreply@vidawellness.pe' },
        content: [{
          type: 'text/html',
          value: emailContent.html
        }]
      })
    })
    */

    return NextResponse.json({ message: "Notification sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Notification error:", error)
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 })
  }
}

function generateEmailContent(type: string, data: any) {
  const isSpanish = data.language === "es"

  if (type === "contact") {
    return {
      subject: isSpanish ? `Nuevo contacto de ${data.name}` : `New contact from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">VIDA Wellness Center</h1>
            <p style="color: white; margin: 5px 0;">
              ${isSpanish ? "Nuevo Mensaje de Contacto" : "New Contact Message"}
            </p>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #374151;">${isSpanish ? "Detalles del Contacto" : "Contact Details"}</h2>
            <p><strong>${isSpanish ? "Nombre" : "Name"}:</strong> ${data.name}</p>
            <p><strong>${isSpanish ? "Email" : "Email"}:</strong> ${data.email}</p>
            <p><strong>${isSpanish ? "Teléfono" : "Phone"}:</strong> ${data.phone || "N/A"}</p>
            <p><strong>${isSpanish ? "Mensaje" : "Message"}:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 5px;">
              ${data.message || (isSpanish ? "Sin mensaje" : "No message")}
            </div>
            <p><strong>${isSpanish ? "Interesado en más información" : "Interested in more info"}:</strong> 
              ${data.interest ? (isSpanish ? "Sí" : "Yes") : isSpanish ? "No" : "No"}
            </p>
          </div>
        </div>
      `,
    }
  }

  if (type === "purchase") {
    return {
      subject: isSpanish
        ? `Nueva compra de membresía - ${data.firstName} ${data.lastName}`
        : `New membership purchase - ${data.firstName} ${data.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">VIDA Wellness Center</h1>
            <p style="color: white; margin: 5px 0;">
              ${isSpanish ? "Nueva Compra de Membresía" : "New Membership Purchase"}
            </p>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #374151;">${isSpanish ? "Detalles de la Compra" : "Purchase Details"}</h2>
            <p><strong>${isSpanish ? "Cliente" : "Customer"}:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>${isSpanish ? "Teléfono" : "Phone"}:</strong> ${data.phone}</p>
            <p><strong>${isSpanish ? "Plan" : "Plan"}:</strong> ${data.plan}</p>
            <p><strong>${isSpanish ? "Fecha de nacimiento" : "Birth Date"}:</strong> ${data.birthDate}</p>
            <p><strong>${isSpanish ? "Tarjeta" : "Card"}:</strong> ****${data.cardNumber?.slice(-4) || "****"}</p>
            
            <div style="background: #e5f3ff; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 0; color: #1e40af; font-weight: bold;">
                ${isSpanish ? "¡Procesar el pago y activar la membresía!" : "Process payment and activate membership!"}
              </p>
            </div>
          </div>
        </div>
      `,
    }
  }

  return { subject: "VIDA Notification", html: "New notification received." }
}
