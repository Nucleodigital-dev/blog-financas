import { login } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams;

  return (
    <div style={{ maxWidth: 420, margin: '100px auto', padding: '32px', background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(11, 43, 28, 0.1)' }}>
      <h1 style={{ marginBottom: 8, fontSize: '1.75rem', textAlign: 'center', fontFamily: 'var(--font-heading)' }}>Admin</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: 32 }}>Grana em Ordem</p>
      
      {error && (
        <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', marginBottom: '24px', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      <form action={login} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', fontWeight: 600 }}>Email</label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            required 
          />
        </div>
        
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', fontWeight: 600 }}>Password</label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            required 
          />
        </div>

        <button 
          formAction={login}
          className="btn btn-primary"
          style={{ width: '100%', padding: '14px', marginTop: 8 }}
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
