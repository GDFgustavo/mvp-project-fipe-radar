import Select from 'react-select'

const SelectCustom = ({
  value,
  onChange,
  options,
  placeholder,
  isDisabled = false,
  isSearchable = true
}) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: '100%',
      backgroundColor: 'var(--card-color)',
      border: '1px solid var(--border-color)',
      borderRadius: '8px',
      padding: '8px 12px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
      boxShadow: 'none',
      outline: 'none',
      transition: 'all 0.3s ease',
      '&:hover': {
        border: '1px solid var(--border-hover)',
        boxShadow: 'none'
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--text-color)',
      fontWeight: '500'
    }),
    input: (provided) => ({
      ...provided,
      color: 'var(--text-color)',
      fontWeight: '500'
    }),
    menu: (provided) => ({
      ...provided,
      border: '1px solid var(--border-color)',
      backgroundColor: 'var(--card-color)',
      marginTop: '8px',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
      overflow: 'hidden',
      zIndex: 9999,
      animation: 'fadeIn 0.3s ease-out'
    }),
    option: (provided, state) => ({
      ...provided,
      padding: '12px 16px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      backgroundColor: state.isSelected
        ? 'var(--border-color)'
        : state.isFocused
          ? 'var(--border-color)'
          : 'var(--card-color)',
      color: state.isSelected ? 'var(--primary)' : 'var(--text-color)',
      transition: 'all 0.2s ease',
      ':active': {
        backgroundColor: 'var(--card-color)'
      },
      display: 'flex',
      alignItems: 'center',
      marginBottom: state.isSelected ? '4px' : '0px',
      borderBottom: '1px solid var(--border-color)'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
      fontWeight: '500'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: '#9ca3af',
      padding: '4px',
      transition: 'transform 0.2s ease',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0)',
      svg: {
        width: 18,
        height: 18
      },
      '&:hover': {
        color: '#6b7280'
      }
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: '#9ca3af',
      padding: '4px',
      '&:hover': {
        color: '#6b7280'
      }
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#eef2ff',
      borderRadius: '8px'
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#4f46e5',
      fontWeight: '500'
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#a5b4fc',
      '&:hover': {
        backgroundColor: '#4f46e5',
        color: 'white'
      }
    })
  }

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      isDisabled={isDisabled}
      isSearchable={isSearchable}
      noOptionsMessage={() => 'Nenhuma opção encontrada'}
      styles={customStyles}
    />
  )
}

export default SelectCustom
