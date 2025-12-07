import styles from './Styles.module.scss'
import CustomButton from '../../Buttons/CustomButton'
import { Link } from 'react-scroll'
import { AddIcon, RemoveIcon } from '../../SvgIcons'
import { useState } from 'react'

const FipeCompare = ({ showCompare, toggleCompare, onConsult, canCompare }) => {
  const [compare, setCompare] = useState('')

  const handleCompare = () => {
    if (!canCompare) {
      setCompare('Preencha todos os campos acima!.')
      setTimeout(() => setCompare(''), 4000)
    } else {
      toggleCompare()
    }
  }

  return (
    <>
      <div className={styles.btn}>
        <CustomButton
          size="large"
          onClick={handleCompare}
          disabled={!canCompare}
        >
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
      {compare && <p className={styles.msg}>{compare}</p>}
    </>
  )
}

export default FipeCompare
