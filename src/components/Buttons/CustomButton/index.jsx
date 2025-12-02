import styles from './Styles.module.scss'

const Button = ({ children, onClick, size = 'small', className }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[size]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
