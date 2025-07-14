import styles from './Styles.module.scss'

const Button = ({ children, onClick, size = 'small' }) => {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[size]}`}>
      {children}
    </button>
  )
}

export default Button
