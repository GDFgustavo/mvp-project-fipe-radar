import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from './components/Navbar'
import './styles.scss'
import Banner from './components/Banner'
import FipeCompareContainer from './components/Fipe/FipeCompareContainer'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Banner />
      <div className="container">
        <FipeCompareContainer />
      </div>
    </QueryClientProvider>
  )
}

export default App
