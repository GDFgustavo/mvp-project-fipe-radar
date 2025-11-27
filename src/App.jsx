import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from './components/Navbar'
import './styles.scss'
import MainBanner from './components/Banner/MainBanner'
import FipeContainer from './components/Fipe/FipeContainer'
import Footer from './components/Footer'
import MonitoringFeatureBanner from './components/Banner/MonitoringFeatureBanner'
import { useFipeForm } from './Features/Fipe/useFipe'
import BrandsCarousel from './components/BrandsCarousel'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppWithFipe />
    </QueryClientProvider>
  )
}

const AppWithFipe = () => {
  const fipeForm = useFipeForm()

  return (
    <>
      <Navbar />
      <MainBanner />
      <BrandsCarousel fipeForm={fipeForm} />
      <MonitoringFeatureBanner />
      <div className="container">
        <FipeContainer fipeForm={fipeForm} />
      </div>
      <Footer />
    </>
  )
}

export default App
