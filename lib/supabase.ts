import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface ContactSubmission {
  id?: string
  full_name: string
  email: string
  phone?: string
  membership_plan?: string
  interested_classes?: string[]
  message?: string
  language: "en" | "es"
  status?: string
  created_at?: string
}

export interface User {
  id?: string
  email: string
  full_name: string
  phone?: string
  created_at?: string
  updated_at?: string
}

export interface MembershipPlan {
  id: string
  name: string
  price: number
  duration_months: number
  features: string[]
  created_at?: string
}

export interface Class {
  id: string
  name: string
  description?: string
  type: "yoga" | "taichi" | "gym" | "dance"
  duration_minutes?: number
  max_capacity?: number
  created_at?: string
}
