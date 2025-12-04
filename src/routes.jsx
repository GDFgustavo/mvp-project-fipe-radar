import { Routes, Route } from 'react-router-dom'
import FipeMonitoring from './Pages/FipeMonitoring'
import NotFound from './Pages/NotFound'
import Confirm from './Pages/Confirm'
import Home from './Pages/Home'

const Rotas = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/monitoring" element={<FipeMonitoring />} />
      <Route path="/confirm" element={<Confirm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Rotas
