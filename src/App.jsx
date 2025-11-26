import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from './components/Navbar'
import './styles.scss'
import MainBanner from './components/Banner/MainBanner'
import FipeContainer from './components/Fipe/FipeContainer'
import Footer from './components/Footer'
import MonitoringFeatureBanner from './components/Banner/MonitoringFeatureBanner'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <MainBanner />
      <MonitoringFeatureBanner />
      <div className="container">
        <FipeContainer />
      </div>
      <Footer />
    </QueryClientProvider>
  )
}

export default App
