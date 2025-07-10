import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { to, name, plan, language } = await request.json()

    // Aquí integrarías con un servicio de email como SendGrid, Resend, etc.
    // Por ahora simulamos el envío

    const emailContent =
      language === "es"
        ? `¡Hola ${name}! Gracias por tu interés en VIDA Wellness Center. Te contactaremos pronto sobre el plan ${plan}.`
        : `Hello ${name}! Thank you for your interest in VIDA Wellness Center. We'll contact you soon about the ${plan} plan.`

    console.log(`Sending email to ${to}: ${emailContent}`)

    // Simular envío exitoso
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Email error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
