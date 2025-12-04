import { Element } from 'react-scroll'
import fipeLogo from '../../assets/fipe-logo.svg'

import styles from './Styles.module.scss'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className={styles.footerContainer}>
      <div className={styles.content}>
        <Link to="/">
          <img
            src={fipeLogo}
            className={styles.navbarLogo}
            alt="Logo FIPE Radar"
          />
        </Link>
        <div>
          <p>
            © <span>{currentYear}</span> Fipe Radar. Todos os direitos
            reservados.
          </p>
          <Element name="contact">
            <a href="https://github.com/GDFgustavo" target="_blank">
              Entre em contato: <span>Clique aqui</span>
            </a>
          </Element>
        </div>
      </div>
    </div>
  )
}

export default Footer
