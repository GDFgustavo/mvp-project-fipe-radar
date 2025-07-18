import styles from './Styles.module.scss'

const FipeResultCard = ({
  brand,
  model,
  modelYear,
  fuel,
  codeFipe,
  price,
  referenceMonth
}) => {
  return (
    <div className={styles.resultContainer}>
      <div className={styles.content}>
        <div className={styles.vehicleCard}>
          <h3>
            {brand} {model}
          </h3>
          <p>
            {modelYear} - {fuel}
          </p>
          <div className={styles.priceHighlight}>
            <p className={styles.priceLabel}>Valor FIPE</p>
            <p className={styles.priceValue}>{price}</p>
          </div>
          <div className={styles.gridContainer}>
            <div>
              <p className={styles.label}>Código FIPE:</p>
              <strong>{codeFipe}</strong>
            </div>
            <div>
              <p className={styles.label}>Mês de referência:</p>
              <strong>{referenceMonth}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FipeResultCard
