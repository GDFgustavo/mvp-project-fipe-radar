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
          <a href="https://github.com/GDFgustavo" target="_blank">
            Entre em contato
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
