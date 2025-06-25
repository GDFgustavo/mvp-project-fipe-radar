import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import InputSelector from './components/InputSelector'
import { useFipeForm } from './Features/Fipe/useFipe'
import FipeResult from './components/FipeResult'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainContent />
    </QueryClientProvider>
  )
}

const MainContent = () => {
  const fipeForm = useFipeForm()

  return (
    <>
      <InputSelector {...fipeForm} />
      {fipeForm.fipeDetails && <FipeResult {...fipeForm.fipeDetails} />}
    </>
  )
}

export default App
