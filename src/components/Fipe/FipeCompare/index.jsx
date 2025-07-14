import styles from './Styles.module.scss'
import CustomButton from '../../Buttons/CustomButton'
import { Link } from 'react-scroll'
import { AddIcon, RemoveIcon } from '../../SvgIcons'

const FipeCompare = ({ showCompare, toggleCompare, onConsult }) => (
  <div className={styles.btn}>
    <CustomButton size="medium" onClick={toggleCompare}>
      {showCompare ? <RemoveIcon /> : <AddIcon />}
      {showCompare ? 'Remover comparação' : 'Adicionar comparação'}
    </CustomButton>
    <Link to="result" smooth={true} duration={500}>
      <CustomButton size="medium" onClick={onConsult}>
        Consultar
      </CustomButton>
    </Link>
  </div>
)

export default FipeCompare
