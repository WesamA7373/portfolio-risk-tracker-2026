import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables are set
if (!supabaseUrl) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL. Add it to your .env.local file. ' +
    'See .env.example for details.'
  )
}

if (!supabaseAnonKey) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_ANON_KEY. Add it to your .env.local file. ' +
    'See .env.example for details.'
  )
}

// Validate URL format (basic check)
try {
  new URL(supabaseUrl)
} catch {
  throw new Error(
    `Invalid NEXT_PUBLIC_SUPABASE_URL format: "${supabaseUrl}". ` +
    'Must be a valid URL (e.g., https://project.supabase.co)'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
