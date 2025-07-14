import { Suspense, useState } from 'react'
import InputSelector from '../../Form/InputSelector'
import FipeResultCard from '../../Result/FipeResultCard'
import FipeResultPdf from '../../Result/FipeResultPdf'
import FipeResultImage from '../../Result/FipeResultImage'
import styles from './Styles.module.scss'
import CustomButton from '../../Buttons/CustomButton'
import { Element, Link } from 'react-scroll'
import { AddIcon, InfoIcon, RemoveIcon } from '../../SvgIcons'
import Spinner from '../../Spinner'

const FipeCompareView = ({
  showCompare,
  toggleCompare,
  fipeForm1,
  fipeForm2,
  isLoading
}) => {
  const result1 = !showCompare && fipeForm1.fipeDetails
  const result2 = showCompare && fipeForm1.fipeDetails && fipeForm2.fipeDetails
  const [show, setShow] = useState(false)

  const isFilled = (form) => !!form.selectedModel && !!form.selectedYear

  const bothFormsFilled = isFilled(fipeForm1) && isFilled(fipeForm2)

  const isFormEqual =
    fipeForm1.selectedModel === fipeForm2.selectedModel &&
    fipeForm1.selectedYear === fipeForm2.selectedYear

  const consult = () => {
    fipeForm1.handleSubmit()
    if (showCompare) {
      fipeForm2.handleSubmit()
    }
  }

  return (
    <div className={styles.inputContainer}>
      {show && (
        <div className={styles.tooltip}>
          <p>
            Comece selecionando a marca do veículo, e depois escolha o modelo e
            o ano conforme sua preferência. Você também pode usar o campo de
            busca em cada etapa do formulário para encontrar as informações
            desejadas com mais agilidade.
          </p>
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

          <div className={styles.btn}>
            {showCompare ? (
              <CustomButton size="medium" onClick={toggleCompare}>
                <RemoveIcon />
                Remover comparação
              </CustomButton>
            ) : (
              <CustomButton size="medium" onClick={toggleCompare}>
                <AddIcon /> Adicionar comparação
              </CustomButton>
            )}
            <Link to="result" smooth={true} duration={500}>
              <CustomButton size="medium" onClick={consult}>
                Consultar
              </CustomButton>
            </Link>
          </div>
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
          (result1 || result2) &&
          !isFormEqual && (
            <>
              <div className={styles.actionButtons}>
                <h3>Resultado FIPE</h3>
                <div>
                  {result1 && (
                    <>
                      <Suspense>
                        <FipeResultPdf vehicles={[fipeForm1.fipeDetails]} />
                      </Suspense>
                      <FipeResultImage vehicles={[fipeForm1.fipeDetails]} />
                    </>
                  )}
                  {result2 && (
                    <>
                      <Suspense>
                        <FipeResultPdf vehicles={[fipeForm1.fipeDetails]} />
                      </Suspense>
                      <FipeResultImage vehicles={[fipeForm1.fipeDetails]} />
                    </>
                  )}
                </div>
              </div>

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

export default FipeCompareView
