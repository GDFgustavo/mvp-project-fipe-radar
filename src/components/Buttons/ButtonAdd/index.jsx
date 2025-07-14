import './Styles.scss'

const ButtonAdd = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={className} class="noselect">
      <span class="text">Add</span>
      <span class="icon">
        <svg
          viewBox="0 0 24 24"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
        <span class="buttonSpan">{children}</span>
      </span>
    </button>
  )
}

export default ButtonAdd
