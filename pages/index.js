import { useState } from 'react'
import Layout from '../components/Layout'

export default function Home(){
  const [siteName, setSiteName] = useState('')
  const [file, setFile] = useState(null)
  const [link, setLink] = useState('')
  const [loading, setLoading] = useState(false)

  const upload = async () => {
    if(!file) return alert('Pilih file HTML terlebih dahulu')
    setLoading(true)
    const html = await file.text()
    const res = await fetch('/api/upload', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ name: siteName || 'untitled', html })
    })
    const data = await res.json()
    setLoading(false)
    if(data.url) setLink(data.url)
    else alert('Gagal upload: ' + (data.error || 'unknown'))
  }

  return (
    <Layout>
      <div style={{display:'grid',gridTemplateColumns:'1fr 420px',gap:18}}>
        <div>
          <label className="muted">Nama Website</label>
          <input type="text" value={siteName} onChange={e=>setSiteName(e.target.value)} style={{width:'100%',padding:12,borderRadius:10,marginTop:8,marginBottom:12,background:'transparent',border:'1px solid rgba(255,255,255,0.04)',color:'inherit'}}/>
          <label className="muted">Upload file HTML</label>
          <input type="file" accept="text/html" onChange={e=>setFile(e.target.files[0])} style={{marginTop:8}}/>
          <div style={{height:12}}/>
          <button className="btn" onClick={upload} disabled={loading}>{loading? 'Uploading...' : 'Upload & Deploy'}</button>

          {link && (
            <div style={{marginTop:14,padding:12,background:'rgba(255,255,255,0.02)',borderRadius:10}}>
              <div className="muted">Link permanen:</div>
              <a className="link" href={link} target="_blank" rel="noreferrer">{link}</a>
            </div>
          )}
        </div>

        <div>
          <div className="muted">Preview (opsional)</div>
          <iframe id="preview" className="preview" style={{display:'none'}}></iframe>
        </div>
      </div>
    </Layout>
  )
}
