import fipeLogo from '../../assets/fipe-logo.svg'
import ThemeButton from '../Buttons/ThemeButton'
import CustomButton from '../Buttons/CustomButton'
import { Link } from 'react-scroll'
import styles from './Styles.module.scss'
import { Link as LinkRouter } from 'react-router-dom'
import { EmailIcon } from '../SvgIcons'
import MenuButton from '../Buttons/MenuButton'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (open && window.innerWidth <= 768) {
        setOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [open])

  const navLinks = [
    { label: 'Início', to: '/' },
    { label: 'Monitorar', to: '/monitoring' }
  ]

  const Logo = () => (
    <LinkRouter to="/">
      <div className={styles.logoContainer}>
        <img
          src={fipeLogo}
          className={styles.navbarLogo}
          alt="Logo Fipe Radar"
        />
        <h1>Fipe Radar</h1>
      </div>
    </LinkRouter>
  )

  const NavLinks = ({ onClick }) => (
    <>
      {navLinks.map((link) => (
        <LinkRouter
          key={link.to}
          to={link.to}
          style={{ textDecoration: 'none' }}
          onClick={onClick}
        >
          <p>{link.label}</p>
        </LinkRouter>
      ))}
    </>
  )

  const ContactButton = ({ onClick, className }) => (
    <Link to="contact" smooth duration={500} onClick={onClick}>
      <CustomButton size="small" className={className}>
        <EmailIcon />
        Entre em contato
      </CustomButton>
    </Link>
  )

  return (
    <header>
      <div className={styles.navbarContainer}>
        <ul>
          <div className={styles.desktopMenu}>
            <li className={styles.left}>
              <Logo />
            </li>

            <li className={styles.center}>
              <NavLinks />
            </li>

            <li className={styles.right}>
              <ContactButton />
              <ThemeButton className={styles.theme} />
            </li>
          </div>

          <div className={styles.menuContainer}>
            <li className={styles.mobileLeft}>
              <Logo />
            </li>

            <li className={styles.menu}>
              <MenuButton isOpen={open} onClick={() => setOpen(!open)} />
            </li>
          </div>

          <div className={`${styles.mobileMenu} ${open ? styles.open : ''}`}>
            <li className={styles.mobileCenter}>
              <NavLinks onClick={() => setOpen(false)} />
            </li>

            <li className={styles.mobileRight}>
              <ContactButton onClick={() => setOpen(false)} />
            </li>

            <li>
              <ThemeButton />
            </li>
          </div>
        </ul>
      </div>
    </header>
  )
}

export default Navbar
