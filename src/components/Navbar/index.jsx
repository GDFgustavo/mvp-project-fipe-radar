import logo from '../../assets/fipe-logo-black.png'
import ThemeButton from '../Buttons/ThemeButton'
import styles from './Styles.module.scss'
import CustomButton from '../Buttons/CustomButton'

const Navbar = () => {
  return (
    <header>
      <div className={styles.navbarContainer}>
        <ul>
          <li>
            <img src={logo} alt="Logo FIPE Radar" />
            <h1>Fipe Radar</h1>
          </li>
          <li>
            <CustomButton size="small">Entre em contato</CustomButton>
            <ThemeButton />
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Navbar
