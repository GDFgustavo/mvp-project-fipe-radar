import { useState } from 'react'
import { useFipeForm } from '../../../Features/Fipe/useFipe'
import FipeView from '../FipeView'

const FipeContainer = ({ fipeForm }) => {
  const [showCompare, setShowCompare] = useState(false)

  const fipeForm1 = fipeForm
  const fipeForm2 = useFipeForm()
  const isLoading = fipeForm1.isLoading || fipeForm2.isLoading

  const toggleCompare = () => {
    if (showCompare) {
      fipeForm2.resetForm()
    }
    setShowCompare(!showCompare)
  }

  return (
    <FipeView
      showCompare={showCompare}
      toggleCompare={toggleCompare}
      fipeForm1={fipeForm1}
      fipeForm2={fipeForm2}
      isLoading={isLoading}
    />
  )
}

export default FipeContainer
