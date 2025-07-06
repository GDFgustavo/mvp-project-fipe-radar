import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FipeCompare from './components/FipeCompare'
import Navbar from './components/Navbar'
import './styles.scss'
import Banner from './components/Banner'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Banner />
      <div className="container">
        <FipeCompare />
      </div>
    </QueryClientProvider>
  )
}

export default App
