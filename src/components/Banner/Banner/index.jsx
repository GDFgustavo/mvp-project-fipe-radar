import styles from './Styles.module.scss'

const Banner = ({ desktopImg, mobileImg }) => {
  return (
    <div
      className={styles.banner}
      style={{
        '--banner-desktop': `var(${desktopImg})`,
        '--banner-mobile': `var(${mobileImg})`
      }}
    />
  )
}

export default Banner
