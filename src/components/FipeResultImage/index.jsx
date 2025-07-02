import { useState } from 'react'
import { toPng } from 'html-to-image'
import fipeLogo from '../../assets/fipe-logo-black.png'
import styles from './Styles.module.scss'

const FipeResultImage = ({ vehicles }) => {
  const [show, setShow] = useState(false)

  const exportAsImage = async (elementId) => {
    const element = document.getElementById(elementId)
    if (!element) return

    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: '#fff'
    })

    const link = document.createElement('a')
    link.download = `relatorio-fipe.png`
    link.href = dataUrl
    link.click()
  }

  return (
    <div className={styles.fipeResult}>
      <button onClick={() => setShow(true)} className={styles.downloadButton}>
        Baixar Imagem
      </button>

      {show && (
        <div className={styles.container}>
          <div
            onClick={() => setShow(false)}
            className={styles.modalOverlay}
          ></div>
          <div className={styles.modalContent}>
            <button
              onClick={() => setShow(false)}
              className={styles.closeButton}
            >
              X
            </button>
            <div id="fiperesult" className={styles.resultContainer}>
              <div className={styles.header}>
                <div className={styles.logoContainer}>
                  <img className={styles.logo} src={fipeLogo} />
                </div>
                <div>
                  <h2 className={styles.title}>Relatório de Veículo</h2>
                  <p className={styles.subtitle}>Consulta FIPE Completa</p>
                </div>
              </div>

              {vehicles.map((vehicle, index) => (
                <div key={index} className={styles.vehicleCard}>
                  <div className={styles.gridContainer}>
                    <div>
                      <p className={styles.label}>
                        <strong>Marca:</strong>
                      </p>
                      <p className={styles.value}>{vehicle.brand}</p>
                    </div>

                    <div>
                      <p className={styles.label}>
                        <strong>Modelo:</strong>
                      </p>
                      <p className={styles.value}>{vehicle.model}</p>
                    </div>
                  </div>

                  <div className={styles.gridContainer}>
                    <div>
                      <p className={styles.label}>
                        <strong>Ano/Combustível:</strong>
                      </p>
                      <p>
                        {vehicle.modelYear} ({vehicle.fuel})
                      </p>
                    </div>

                    <div>
                      <p className={styles.label}>
                        <strong>Código FIPE:</strong>
                      </p>
                      <p>{vehicle.codeFipe}</p>
                    </div>
                  </div>

                  <div className={styles.priceHighlight}>
                    <p className={styles.priceLabel}>Valor FIPE</p>
                    <p className={styles.priceValue}>{vehicle.price}</p>
                  </div>
                </div>
              ))}

              <div className={styles.footer}>
                <p className={styles.footerText}>
                  Emitido em {new Date().toLocaleDateString('pt-BR')} via{' '}
                  <strong>FIPE Radar</strong>
                </p>
                <p className={styles.footerSubtext}>
                  Documento válido para consulta comercial
                </p>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button
                onClick={() => exportAsImage('fiperesult')}
                className={styles.exportButton}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Exportar Relatório
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FipeResultImage
