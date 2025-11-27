import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '8rem' }}>
      <h1
        style={{
          backgroundColor: 'var(--primary)',
          fontSize: '24px',
          color: 'var(--text-color)',
          padding: '8px'
        }}
      >
        Eita! Algo deu errado :(
      </h1>
      <p style={{ fontSize: '16px', margin: '1rem 0' }}>
        Não fique triste, <Link to="/">clique aqui</Link> e volte para a página
        principal.
      </p>
    </div>
  )
}
