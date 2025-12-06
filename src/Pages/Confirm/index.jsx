import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import supabase from '../../supabase-client'

const Confirm = () => {
  const [searchParams] = useSearchParams()
  const [message, setMessage] = useState('Confirmando alerta...')

  useEffect(() => {
    const confirmToken = async () => {
      const token = searchParams.get('token')

      if (!token) {
        setMessage('Token inválido.')
        return
      }

      const { data, error } = await supabase
        .from('price_alerts')
        .update({ is_confirmed: true })
        .eq('confirmation_token', token)
        .select()

      if (error || !data?.length) {
        setMessage('Token inválido ou alerta não encontrado.')
      } else {
        setMessage(
          '✅ Alerta confirmado com sucesso! Você será notificado quando o preço for atingido.'
        )
      }
    }

    confirmToken()
  }, [searchParams])

  return (
    <div
      className="container"
      style={{
        textAlign: 'center',
        marginTop: '16rem',
        color: 'var(--text-color)'
      }}
    >
      <h2>{message}</h2>
    </div>
  )
}

export default Confirm
