import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { plan, email, name } = await request.json()

    // Aquí integrarías con Stripe
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

    const prices = {
      basic: 4900, // $49.00 en centavos
      premium: 8900, // $89.00 en centavos
      elite: 12900, // $129.00 en centavos
    }

    // Simular creación de sesión de pago de Stripe
    const paymentSession = {
      id: "cs_test_" + Math.random().toString(36).substr(2, 9),
      amount: prices[plan as keyof typeof prices] || 4900,
      currency: "usd",
      customer_email: email,
      metadata: {
        plan,
        customer_name: name,
      },
    }

    console.log("Payment session created:", paymentSession)

    // Simular procesamiento exitoso
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return NextResponse.json(
      {
        success: true,
        session: paymentSession,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Payment error:", error)
    return NextResponse.json({ error: "Payment failed" }, { status: 500 })
  }
}
