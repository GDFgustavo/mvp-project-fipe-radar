import styles from './Styles.module.scss'
import { Suspense } from 'react'
import FipeResultPdf from '../../Result/FipeResultPdf'
import FipeResultImage from '../../Result/FipeResultImage'

const FipeDownload = ({ vehicles }) => (
  <div className={styles.actionButtons}>
    <h3>Resultado FIPE</h3>
    <div className={styles.actionItems}>
      <Suspense key={vehicles.map((v) => v.codeFipe).join('-')}>
        {vehicles?.length > 0 && <FipeResultPdf vehicles={vehicles} />}
      </Suspense>
      <FipeResultImage vehicles={vehicles} />
    </div>
  </div>
)

export default FipeDownload
