import fipeLogo from '../../assets/fipe-logo.svg'
import ThemeButton from '../Buttons/ThemeButton'
import CustomButton from '../Buttons/CustomButton'
import { Link } from 'react-scroll'
import styles from './Styles.module.scss'

const Navbar = () => {
  return (
    <header>
      <div className={styles.navbarContainer}>
        <ul>
          <div>
            <img
              src={fipeLogo}
              className={styles.navbarLogo}
              alt="Logo FIPE Radar"
            />
            <h1>Fipe Radar</h1>
          </div>
          <li>
            <Link to="contact" smooth={true} duration={500}>
              <CustomButton size="small">Entre em contato</CustomButton>
            </Link>
            <ThemeButton />
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Navbar
