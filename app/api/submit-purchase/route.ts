import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Google Sheets configuration
    const SHEET_ID = process.env.GOOGLE_SHEET_ID
    const API_KEY = process.env.GOOGLE_SHEETS_API_KEY

    if (!SHEET_ID || !API_KEY) {
      throw new Error("Missing Google Sheets configuration")
    }

    // Prepare purchase data for Google Sheets
    const rowData = [
      new Date().toISOString(),
      "purchase",
      `${body.firstName} ${body.lastName}`,
      body.email,
      body.phone,
      body.plan,
      body.plan === "condor" ? "$49" : body.plan === "puma" ? "$89" : "$129",
      body.birthDate,
      body.cardNumber ? `****${body.cardNumber.slice(-4)}` : "",
      body.language || "es",
      "Pending Payment",
    ]

    // Google Sheets API URL for purchases
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Compras:append?valueInputOption=RAW&key=${API_KEY}`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [rowData],
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("Google Sheets API Error:", errorData)
      throw new Error("Failed to submit purchase to Google Sheets")
    }

    // Send purchase notification email
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/send-notification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "purchase",
        data: body,
        to: "waldiamio16000@gmail.com",
      }),
    }).catch((err) => console.log("Email notification failed:", err))

    return NextResponse.json({ message: "Purchase submitted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Purchase submission error:", error)
    return NextResponse.json({ error: "Failed to submit purchase" }, { status: 500 })
  }
}
