import styles from './Styles.module.scss'

const Button = ({ children, onClick, size = 'small' }) => {
  return (
    <div onClick={onClick} className={`${styles.btn} ${styles[size]}`}>
      {children}
    </div>
  )
}

export default Button
