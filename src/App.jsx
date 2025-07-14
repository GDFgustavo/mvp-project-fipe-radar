import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from './components/Navbar'
import './styles.scss'
import Banner from './components/Banner'
import FipeContainer from './components/Fipe/FipeContainer'
import Footer from './components/Footer'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Banner />
      <div className="container">
        <FipeContainer />
      </div>
      <Footer />
    </QueryClientProvider>
  )
}

export default App
