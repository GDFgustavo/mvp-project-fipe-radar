import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from './components/Navbar'
import './styles.scss'
import Footer from './components/Footer'
import { BrowserRouter } from 'react-router-dom'
import Rotas from './routes'
import ScrollToTop from './components/ScrollToTop'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <div className="layout">
          <Navbar />
          <main className="main-content">
            <Rotas />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
