import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([
        {
          full_name: body.name,
          email: body.email,
          phone: body.phone,
          membership_plan: body.plan,
          interested_classes: body.classes,
          message: body.message,
          language: body.language || "en",
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to submit form" }, { status: 500 })
    }

    return NextResponse.json({ message: "Form submitted successfully", data }, { status: 200 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
