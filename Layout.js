export default function Layout({ children }) {
  return (
    <div className="container">
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:12}}>
        <div style={{background:'linear-gradient(90deg,#72efdd,#6b8cff)',padding:'8px 12px',borderRadius:10,color:'#052027',fontWeight:800}}>DEPLOY</div>
        <div>
          <h1 style={{margin:0,fontSize:20}}>DEPLOY WEB BY Zyxxennn</h1>
          <div className="muted" style={{fontSize:13}}>Ubah HTML menjadi website — hosting permanen (Supabase)</div>
        </div>
      </div>
      <div className="card">{children}</div>
    </div>
  )
}
