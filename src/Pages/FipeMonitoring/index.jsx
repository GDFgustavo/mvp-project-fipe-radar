import { useState } from 'react'
import InputSelector from '../../components/Form/InputSelector'
import { useFipeForm } from '../../Features/Fipe/useFipe'
import styles from './Styles.module.scss'
import CustomButton from '../../components/Buttons/CustomButton'
import Spinner from '../../components/Spinner'
import {
  BellIcon,
  DownIcon,
  EmailIcon,
  TargetIcon,
  UpIcon,
  CarIcon
} from '../../components/SvgIcons'
import { Element, Link } from 'react-scroll'
import { NumericFormat } from 'react-number-format'
import supabase from '../../supabase-client'

const FipeMonitoring = ({ onChange }) => {
  const fipeForm3 = useFipeForm()
  const [email, setEmail] = useState('')
  const [priceTrend, setPriceTrend] = useState('up')
  const [targetPrice, setTargetPrice] = useState(1000)
  const [formError, setFormError] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const brandName = fipeForm3.brands?.find(
    (b) => b.code === fipeForm3.selectedBrand
  )?.name

  const modelName = fipeForm3.models?.find(
    (m) => m.code === fipeForm3.selectedModel
  )?.name

  const yearName = fipeForm3.years?.find(
    (y) => y.code === fipeForm3.selectedYear
  )?.name

  const handleClick = (value) => {
    setPriceTrend(value)
    onChange?.(value)
  }

  const MIN_VALUE = 1000

  function minValueInput(values) {
    const numeric = Number(values.value)

    if (!values.value) {
      setTargetPrice('')
      return
    }

    if (numeric < MIN_VALUE) {
      setTargetPrice(numeric)
      return
    }

    setTargetPrice(numeric)
  }

  function fixMinOnBlur() {
    if (!targetPrice || Number(targetPrice) < MIN_VALUE) {
      setTargetPrice(MIN_VALUE)
    }
  }

  const monitoring = async () => {
    if (
      !fipeForm3.selectedBrand ||
      !fipeForm3.selectedModel ||
      !fipeForm3.selectedYear ||
      !targetPrice ||
      !priceTrend ||
      !email
    ) {
      setFormError('Todos os campos são obrigatórios!.')
      setTimeout(() => setFormError(''), 4000)
      return
    }

    if (priceTrend === 'down' && Number(targetPrice) === MIN_VALUE) {
      setFormError(
        'Para monitorar queda de preço, selecione um valor acima de R$ 1.000.'
      )
      setTimeout(() => setFormError(''), 4000)
      return
    }

    setLoading(true)

    const monitoringData = {
      vehicle_type: fipeForm3.vehicleType,
      brand: fipeForm3.selectedBrand,
      brand_name: brandName,
      model: fipeForm3.selectedModel,
      model_name: modelName,
      year: fipeForm3.selectedYear,
      year_name: yearName,
      target_price: Number(targetPrice),
      price_trend: priceTrend,
      email,
      email_sent: false,
      is_confirmed: false
    }

    try {
      const { data, error } = await supabase
        .from('price_alerts')
        .insert([monitoringData])
        .select()

      if (error) throw new Error('Erro ao salvar alerta no banco.')

      const newAlert = data[0]

      const res = await fetch(
        'https://rztauzydejjhnkkikfyv.functions.supabase.co/send-confirmation',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({ record: newAlert })
        }
      )

      if (!res.ok) throw new Error('Falha ao enviar e-mail de confirmação.')

      setSuccess(
        'Alerta criado com sucesso!. Verifique seu e-mail para confirmar o alerta.'
      )
      setTimeout(() => setSuccess(''), 7000)
    } catch {
      setError('Ocorreu um erro ao criar o alerta. Tente novamente mais tarde.')
      setTimeout(() => setError(''), 7000)
    } finally {
      fipeForm3.resetForm()
      setTargetPrice('')
      setPriceTrend('up')
      setEmail('')
      setLoading(false)
    }
  }

  return (
    <>
      <Link to="monitoring" smooth={true} offset={-80} duration={500}>
        <div className={styles.banner}></div>
      </Link>

      <div className="container">
        <Element name="monitoring">
          <div className={styles.content}>
            <h1>Configure seu monitoramento</h1>
            <div className={styles.section}>
              <div className={styles.svg}>
                <CarIcon />
              </div>
              <h3>Detalhes do veículo</h3>
            </div>
            <InputSelector {...fipeForm3} />

            <div className={styles.gridContainer}>
              <div className={styles.field}>
                <div className={styles.section}>
                  <div>
                    <TargetIcon />
                  </div>
                  <h3>Preço alvo</h3>
                </div>
                <label>Preço alvo (Valor mínimo: R$ 1.000)</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.prefix}>R$</span>
                  <NumericFormat
                    value={targetPrice}
                    onValueChange={minValueInput}
                    onBlur={fixMinOnBlur}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={0}
                    allowNegative={false}
                    isAllowed={(values) => values.value.length <= 9}
                    className={styles.inputBase}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label>Notificar quando</label>
                <div className={styles.buttonsGroup}>
                  <button
                    onClick={() => handleClick('up')}
                    className={
                      priceTrend === 'up' ? styles.up : styles.buttonDefault
                    }
                  >
                    <UpIcon />
                    Aumentar preço
                  </button>

                  <button
                    onClick={() => handleClick('down')}
                    className={
                      priceTrend === 'down' ? styles.down : styles.buttonDefault
                    }
                  >
                    <DownIcon />
                    Diminuir preço
                  </button>
                </div>
              </div>

              <div className={styles.field}>
                <div className={styles.section}>
                  <div>
                    <EmailIcon />
                  </div>
                  <h3>Endereço eletrônico</h3>
                </div>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Insira seu email"
                  maxLength={200}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.inputBase}
                />
              </div>

              <div className={`${styles.field} `}>
                <CustomButton className={styles.submitBtn} onClick={monitoring}>
                  <BellIcon />
                  Ativar notificações
                </CustomButton>
              </div>
            </div>
            {formError && <p className={styles.errorForm}>{formError}</p>}
          </div>
          {loading ? (
            <div className={styles.spinnerContainer}>
              <Spinner />
            </div>
          ) : (
            success && <p className={styles.success}>{success}</p>
          )}
          {error && <p className={styles.error}>{error}</p>}
        </Element>
      </div>
    </>
  )
}

export default FipeMonitoring
