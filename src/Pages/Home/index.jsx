import BrandsCarousel from '../../components/BrandsCarousel'
import FipeContainer from '../../components/Fipe/FipeContainer'
import { useFipeForm } from '../../Features/Fipe/useFipe'
import Banner from '../../components/Banner/Banner'
import { Link } from 'react-scroll'
import { Link as LinkRouter } from 'react-router-dom'

const Home = () => {
  const fipeForm = useFipeForm()

  return (
    <>
      <Link to="consult" smooth={true} offset={-80} duration={500}>
        <Banner
          desktopImg="--hero"
          mobileImg="--hero-mobile"
          alt="Banner Consulta"
        />
      </Link>
      <BrandsCarousel fipeForm={fipeForm} />
      <LinkRouter style={{ textDecoration: 'none' }} to="/monitoring">
        <Banner
          desktopImg="--monitor-call"
          mobileImg="--monitor-call-mobile"
          alt="Banner Monitoramento"
        />
      </LinkRouter>
      <div className="container">
        <FipeContainer fipeForm={fipeForm} />
      </div>
    </>
  )
}

export default Home
