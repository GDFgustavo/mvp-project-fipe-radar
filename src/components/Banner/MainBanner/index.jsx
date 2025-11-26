import styles from './Styles.module.scss'
import CustomButton from '../../Buttons/CustomButton'
import { Link } from 'react-scroll'

const MainBanner = () => {
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
        <Link to="consult" smooth={true} offset={-80} duration={500}>
          <CustomButton size="medium">Consultar</CustomButton>
        </Link>
      </div>
    </div>
  )
}

export default MainBanner
