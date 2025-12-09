import styles from './Styles.module.scss'

const MenuButton = ({ onClick, className, isOpen = false }) => {
  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        onClick={onClick}
        className={`${styles.iconMenu} ${isOpen ? styles.open : ''}`}
      >
        <span className={`${styles.bar} ${styles.bar1}`} />
        <span className={`${styles.bar} ${styles.bar2}`} />
        <span className={`${styles.bar} ${styles.bar3}`} />
      </button>
    </div>
  )
}

export default MenuButton
