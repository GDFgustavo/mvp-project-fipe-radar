import Marquee from 'react-fast-marquee'
import styles from './Styles.module.scss'
import { Link } from 'react-scroll'

const BrandsCarousel = ({ fipeForm }) => {
  const { allBrands } = fipeForm

  return (
    <div className={styles.container}>
      <Marquee speed={60}>
        <ul>
          {allBrands.map((brand) => (
            <div key={brand.code}>
              <Link to="consult" smooth={true} offset={-80} duration={500}>
                <li onClick={() => fipeForm.handleBrandsSlider(brand)}>
                  {brand.name}
                </li>
              </Link>
            </div>
          ))}
        </ul>
      </Marquee>
    </div>
  )
}

export default BrandsCarousel
