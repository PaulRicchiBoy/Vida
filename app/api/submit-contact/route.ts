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

    // Prepare data for Google Sheets
    const rowData = [
      new Date().toISOString(),
      body.type || "contact",
      body.name || "",
      body.email || "",
      body.phone || "",
      body.message || "",
      body.interest ? "Yes" : "No",
      body.language || "es",
      "New",
    ]

    // Google Sheets API URL
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Contactos:append?valueInputOption=RAW&key=${API_KEY}`

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
      throw new Error("Failed to submit to Google Sheets")
    }

    // Send notification email to waldiamio16000@gmail.com
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/send-notification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "contact",
        data: body,
        to: "waldiamio16000@gmail.com",
      }),
    }).catch((err) => console.log("Email notification failed:", err))

    return NextResponse.json({ message: "Contact submitted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Contact submission error:", error)
    return NextResponse.json({ error: "Failed to submit contact" }, { status: 500 })
  }
}
