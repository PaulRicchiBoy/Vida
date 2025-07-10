import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Configuración de Google Sheets API
    const SHEET_ID = process.env.GOOGLE_SHEET_ID || "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
    const API_KEY = process.env.GOOGLE_SHEETS_API_KEY

    // Datos a enviar a Google Sheets
    const rowData = [
      new Date().toISOString(),
      body.name,
      body.email,
      body.phone || "",
      body.plan || "",
      body.classes?.join(", ") || "",
      body.message || "",
      body.language || "es",
    ]

    // URL de la API de Google Sheets
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1:append?valueInputOption=RAW&key=${API_KEY}`

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
      throw new Error("Failed to submit to Google Sheets")
    }

    return NextResponse.json({ message: "Success" }, { status: 200 })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 })
  }
}
