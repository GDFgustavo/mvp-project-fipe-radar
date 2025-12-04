import MainBanner from '../../components/Banner/MainBanner'
import MonitoringFeatureBanner from '../../components/Banner/MonitoringFeatureBanner'
import BrandsCarousel from '../../components/BrandsCarousel'
import FipeContainer from '../../components/Fipe/FipeContainer'
import { useFipeForm } from '../../Features/Fipe/useFipe'

const Home = () => {
  const fipeForm = useFipeForm()

  return (
    <>
      <MainBanner />
      <BrandsCarousel fipeForm={fipeForm} />
      <MonitoringFeatureBanner />
      <div className="container">
        <FipeContainer fipeForm={fipeForm} />
      </div>
    </>
  )
}

export default Home
