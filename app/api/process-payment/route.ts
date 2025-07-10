import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { plan, amount, customer } = await request.json()

    // Simulate payment processing with Stripe
    // In production, you would use actual Stripe API

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate successful payment
    const paymentResult = {
      id: `pi_${Math.random().toString(36).substr(2, 9)}`,
      amount: amount * 100, // Convert to cents
      currency: "usd",
      status: "succeeded",
      customer: {
        name: `${customer.firstName} ${customer.lastName}`,
        email: customer.email,
      },
      plan: plan,
      created: new Date().toISOString(),
    }

    // Update Google Sheets with payment confirmation
    const SHEET_ID = process.env.GOOGLE_SHEET_ID
    const API_KEY = process.env.GOOGLE_SHEETS_API_KEY

    if (SHEET_ID && API_KEY) {
      // Find and update the purchase record
      const updateData = [[new Date().toISOString(), "Payment Completed", paymentResult.id]]

      const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Pagos:append?valueInputOption=RAW&key=${API_KEY}`

      await fetch(updateUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values: updateData }),
      }).catch((err) => console.log("Failed to update payment status:", err))
    }

    // Send confirmation email to customer
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/send-confirmation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: customer,
        payment: paymentResult,
        plan: plan,
      }),
    }).catch((err) => console.log("Confirmation email failed:", err))

    return NextResponse.json(
      {
        success: true,
        payment: paymentResult,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Payment processing error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Payment processing failed",
      },
      { status: 500 },
    )
  }
}
