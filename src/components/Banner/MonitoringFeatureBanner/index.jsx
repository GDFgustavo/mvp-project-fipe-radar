import styles from './Styles.module.scss'
import CustomButton from '../../Buttons/CustomButton'
import { Link } from 'react-scroll'

const MonitoringFeatureBanner = () => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.content}>
        <h2>Monitore o preço do seu veículo</h2>
        <p>
          Monitore o preço fipe do seu veículo e receba alertas de valorização
          ou desvalorização diretamente no seu celular
        </p>
        <Link to="consult" smooth={true} offset={-80} duration={500}>
          <CustomButton size="medium">Ver mais</CustomButton>
        </Link>
      </div>
    </div>
  )
}

export default MonitoringFeatureBanner
