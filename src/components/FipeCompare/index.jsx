import { useState } from 'react'
import InputSelector from '../InputSelector'
import FipeResult from '../FipeResult'
import { useFipeForm } from '../../Features/Fipe/useFipe'

const FipeCompare = () => {
  const [showCompare, setShowCompare] = useState(false)

  const fipeForm1 = useFipeForm()
  const fipeForm2 = useFipeForm()

  const toggleCompare = () => {
    if (showCompare) {
      fipeForm2.resetForm()
    }
    setShowCompare(!showCompare)
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <InputSelector {...fipeForm1} />
        {showCompare && <InputSelector {...fipeForm2} />}
      </div>

      <div style={{ marginTop: '20px' }}>
        {!showCompare && fipeForm1.fipeDetails && (
          <>
            <FipeResult {...fipeForm1.fipeDetails} />
          </>
        )}

        {showCompare && fipeForm1.fipeDetails && fipeForm2.fipeDetails && (
          <>
            <div style={{ display: 'flex', gap: '20px' }}>
              <FipeResult {...fipeForm1.fipeDetails} />
              <FipeResult {...fipeForm2.fipeDetails} />
            </div>
          </>
        )}
      </div>

      <button onClick={toggleCompare}>
        {showCompare ? 'Remover comparação' : 'Comparar outro veículo'}
      </button>
    </div>
  )
}

export default FipeCompare
