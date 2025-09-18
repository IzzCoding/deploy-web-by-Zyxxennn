import { createClient } from '@supabase/supabase-js'
import { nanoid } from 'nanoid'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, html } = req.body
  if (!html) return res.status(400).json({ error: 'Html required' })

  const id = nanoid(8)
  const payload = { id, name: name || null, html }

  const { error } = await supabase.from('sites').insert([payload])
  if (error) {
    return res.status(500).json({ error: error.message })
  }

  // Build public URL
  const vercelUrl = process.env.VERCEL_URL || (req.headers['x-forwarded-host'] ? req.headers['x-forwarded-host'] : null)
  const host = vercelUrl ? `https://${vercelUrl}` : ''
  const url = host ? `${host}/site/${id}` : `/site/${id}`

  res.status(200).json({ url })
}
