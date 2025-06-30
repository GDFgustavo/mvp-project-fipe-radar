import { lazy, Suspense, useState } from 'react'
import InputSelector from '../InputSelector'
import FipeResult from '../FipeResult'
// import FipeResultPdf from '../FipeResultPdf'
import { useFipeForm } from '../../Features/Fipe/useFipe'

const FipeResultPdf = lazy(() => import('../FipeResultPdf'))

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
            <Suspense>
              <FipeResultPdf vehicles={[fipeForm1.fipeDetails]} />
            </Suspense>
          </>
        )}

        {showCompare && fipeForm1.fipeDetails && fipeForm2.fipeDetails && (
          <>
            <div style={{ display: 'flex', gap: '20px' }}>
              <FipeResult {...fipeForm1.fipeDetails} />
              <FipeResult {...fipeForm2.fipeDetails} />
            </div>

            <Suspense>
              <FipeResultPdf
                vehicles={[fipeForm1.fipeDetails, fipeForm2.fipeDetails]}
              />
            </Suspense>
          </>
        )}
      </div>

      <button onClick={toggleCompare}>
        {showCompare ? 'Remover comparação' : 'Adicionar comparação'}
      </button>
    </div>
  )
}

export default FipeCompare
