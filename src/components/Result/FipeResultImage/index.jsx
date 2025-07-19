import { useState } from 'react'
import { toPng } from 'html-to-image'
import fipeLogo from '../../../assets/fipe-logo.svg'
import styles from './Styles.module.scss'
import CustomButton from '../../Buttons/CustomButton'
import { DownloadIcon, ImageIcon } from '../../SvgIcons'

const FipeResultImage = ({ vehicles }) => {
  const [show, setShow] = useState(false)

  const exportAsImage = async (elementId) => {
    const element = document.getElementById(elementId)
    const currentTheme =
      document.documentElement.getAttribute('data-theme') || 'light'
    if (!element) return

    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: currentTheme === 'dark' ? '#121212' : '#ffffff'
    })

    const link = document.createElement('a')
    link.download = `relatorio-fipe.png`
    link.href = dataUrl
    link.click()
  }

  return (
    <div className={styles.fipeResult}>
      <CustomButton size="medium" onClick={() => setShow(true)}>
        <ImageIcon />
        Baixar Imagem
      </CustomButton>

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
                  <img className={styles.navbarLogo} src={fipeLogo} />
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
              <CustomButton
                size="medium"
                onClick={() => exportAsImage('fiperesult')}
                className={styles.exportButton}
              >
                <DownloadIcon />
                Exportar Relatório
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FipeResultImage
