import styles from './Styles.module.scss'
import CustomButton from '../CustomButton'

const Banner = () => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.content}>
        <h2>
          Consulta <span className={styles.contrast}>FIPE</span>
          {new Date().getFullYear()}
        </h2>
        <p>
          Consulte e compare preços de veículos com a tabela FIPE mais
          atualizada do mercado
        </p>
        <CustomButton size="medium">Consultar</CustomButton>
      </div>
    </div>
  )
}

export default Banner
