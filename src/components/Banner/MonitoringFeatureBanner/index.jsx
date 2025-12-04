import styles from './Styles.module.scss'
import CustomButton from '../../Buttons/CustomButton'
import { Link } from 'react-router-dom'

const MonitoringFeatureBanner = () => {
  return (
    <Link style={{ textDecoration: 'none' }} to="/monitoring">
      <div className={styles.bannerContainer}>
        <div className={styles.content}>
          <h2>Monitore o preço do seu veículo</h2>
          <p>
            Monitore o preço fipe do seu veículo e receba alertas de valorização
            ou desvalorização diretamente no seu celular
          </p>
          <CustomButton size="medium">Ver mais</CustomButton>
        </div>
      </div>
    </Link>
  )
}

export default MonitoringFeatureBanner
