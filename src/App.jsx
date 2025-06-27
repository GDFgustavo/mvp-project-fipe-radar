import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import FipeCompare from './components/FipeCompare'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FipeCompare />
    </QueryClientProvider>
  )
}

export default App
