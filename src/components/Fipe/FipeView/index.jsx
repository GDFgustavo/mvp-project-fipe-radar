import { useState } from 'react'
import InputSelector from '../../Form/InputSelector'
import FipeResultCard from '../../Result/FipeResultCard'
import styles from './Styles.module.scss'
import { Element } from 'react-scroll'
import { InfoIcon } from '../../SvgIcons'
import Spinner from '../../Spinner'
import FipeCompare from '../FipeCompare'
import FipeDownload from '../FipeDownload'

const FipeView = ({
  showCompare,
  toggleCompare,
  fipeForm1,
  fipeForm2,
  isLoading
}) => {
  const result1 = !showCompare && fipeForm1.fipeDetails
  const result2 = showCompare && fipeForm1.fipeDetails && fipeForm2.fipeDetails
  const vehicles = result2
    ? [fipeForm1.fipeDetails, fipeForm2.fipeDetails].filter(Boolean)
    : [fipeForm1.fipeDetails].filter(Boolean)

  const [show, setShow] = useState(false)

  const isFilled = (form) => !!form.selectedModel && !!form.selectedYear

  const bothFormsFilled = isFilled(fipeForm1) && isFilled(fipeForm2)

  const isFormEqual =
    fipeForm1.selectedModel === fipeForm2.selectedModel &&
    fipeForm1.selectedYear === fipeForm2.selectedYear

  const showResults = (result1 || result2) && !isFormEqual

  const consult = () => {
    fipeForm1.handleSubmit()

    if (showCompare) {
      if (isFilled(fipeForm2)) {
        fipeForm2.handleSubmit()
      } else {
        toggleCompare()
      }
    }
  }

  return (
    <div className={styles.inputContainer}>
      {show && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipTitle}>
            <InfoIcon />
            <span>Como consultar a Tabela FIPE</span>
          </div>
          <p>Siga estes passos para realizar sua consulta:</p>
          <ul className={styles.tooltipSteps}>
            <li>Selecione a marca do veículo</li>
            <li>Escolha o modelo e ano de preferência</li>
            <li>Use o campo de busca para agilizar</li>
            <li>Clique em "Consultar" para ver os valores</li>
          </ul>
        </div>
      )}

      <Element name="consult">
        <div className={styles.content}>
          <div className={styles.info} onClick={() => setShow(!show)}>
            <InfoIcon />
          </div>
          <h3>Consulta Tabela FIPE</h3>
          <InputSelector {...fipeForm1} />
          {showCompare && <InputSelector {...fipeForm2} />}
          <FipeCompare
            onConsult={consult}
            showCompare={showCompare}
            toggleCompare={toggleCompare}
          />
        </div>
      </Element>

      <Element name="result">
        {showCompare && bothFormsFilled && isFormEqual && (
          <h4 className={styles.msgError}>
            Não é possível comparar dois veículos iguais.
          </h4>
        )}

        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          showResults && (
            <>
              <FipeDownload vehicles={vehicles} />
              <div
                className={
                  !showCompare && fipeForm1.fipeDetails
                    ? styles.centerResult
                    : styles.gridResult
                }
              >
                {result1 && <FipeResultCard {...fipeForm1.fipeDetails} />}
                {result2 && (
                  <>
                    <FipeResultCard {...fipeForm1.fipeDetails} />
                    <FipeResultCard {...fipeForm2.fipeDetails} />
                  </>
                )}
              </div>
            </>
          )
        )}
      </Element>
    </div>
  )
}

export default FipeView
