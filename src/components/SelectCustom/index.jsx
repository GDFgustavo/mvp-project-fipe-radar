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
    control: (provided, state) => ({
      ...provided,
      width: '100%',
      backgroundColor: state.isFocused ? '#f8f9fa' : '#fff',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      padding: '8px 12px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
      boxShadow: state.isFocused ? '0 0 0 2px #000' : 'none',
      transition: 'all 0.3s ease',
      '&:hover': {
        borderColor: '#000000',
        boxShadow: '0 0 0 1px #000'
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#1f2937',
      fontWeight: '500'
    }),
    input: (provided) => ({
      ...provided,
      color: '#1f2937',
      fontWeight: '500'
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: '8px',
      borderRadius: '12px',
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
        ? '#eef2ff'
        : state.isFocused
          ? '#f5f7ff'
          : '#fff',
      color: state.isSelected ? '#4f46e5' : '#4b5563',
      transition: 'all 0.2s ease',
      ':active': {
        backgroundColor: '#eef2ff'
      },
      display: 'flex',
      alignItems: 'center',
      '&:not(:last-child)': {
        borderBottom: '1px solid #f3f4f6'
      }
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
