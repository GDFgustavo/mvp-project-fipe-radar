import styles from './Styles.module.scss'
import CustomButton from '../../Buttons/CustomButton'
import { Link } from 'react-scroll'
import { AddIcon, RemoveIcon } from '../../SvgIcons'

const FipeCompare = ({ showCompare, toggleCompare, onConsult }) => (
  <div className={styles.btn}>
    <CustomButton size="large" onClick={toggleCompare}>
      {showCompare ? <RemoveIcon /> : <AddIcon />}
      {showCompare ? 'Remover comparação' : 'Adicionar comparação'}
    </CustomButton>
    <Link
      to="result"
      smooth={true}
      duration={500}
      className={styles.reactScrollLink}
    >
      <CustomButton size="large" onClick={onConsult}>
        Consultar
      </CustomButton>
    </Link>
  </div>
)

export default FipeCompare
