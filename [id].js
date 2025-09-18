import { createClient } from '@supabase/supabase-js'

export async function getServerSideProps({ params }) {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
  const { data, error } = await supabase
    .from('sites')
    .select('html, name')
    .eq('id', params.id)
    .single()

  if(error || !data) {
    return { notFound: true }
  }

  // return HTML as prop
  return { props: { html: data.html } }
}

export default function Site({ html }) {
  // Render raw HTML (full page)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  )
}
