import { Element } from 'react-scroll'
import logo from '../../assets/fipe-logo-black.png'

import styles from './Styles.module.scss'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className={styles.footerContainer}>
      <div className={styles.content}>
        <img src={logo} />
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
