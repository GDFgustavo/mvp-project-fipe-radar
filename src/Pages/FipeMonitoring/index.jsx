import { useState } from 'react'
import InputSelector from '../../components/Form/InputSelector'
import { useFipeForm } from '../../Features/Fipe/useFipe'
import styles from './Styles.module.scss'
import CustomButton from '../../components/Buttons/CustomButton'
import {
  BellIcon,
  DownIcon,
  EmailIcon,
  TargetIcon,
  UpIcon,
  VehicleIcon
} from '../../components/SvgIcons'
import { Element, Link } from 'react-scroll'
import { NumericFormat } from 'react-number-format'

const Alerts = ({ onChange }) => {
  const fipeForm3 = useFipeForm()
  const [email, setEmail] = useState('')
  const [priceTrend, setPriceTrend] = useState('up')
  const [targetPrice, setTargetPrice] = useState('')

  const handleClick = (value) => {
    setPriceTrend(value)
    onChange?.(value)
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
              <div>
                <VehicleIcon />
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
                <label>Preço alvo</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.prefix}>R$</span>
                  <NumericFormat
                    value={targetPrice}
                    onValueChange={(values) => setTargetPrice(values.value)}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={0}
                    fixedDecimalScale={false}
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
                <CustomButton className={styles.submitBtn}>
                  <BellIcon />
                  Ativar notificações
                </CustomButton>
              </div>
            </div>
          </div>
        </Element>
      </div>
    </>
  )
}

export default Alerts
