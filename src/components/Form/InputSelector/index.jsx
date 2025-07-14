import SelectCustom from '../SelectCustom'
import styles from './Styles.module.scss'

const InputSelector = ({
  vehicleType,
  selectedBrand,
  selectedModel,
  selectedYear,
  brands,
  models,
  years,
  handleVehicleChange,
  handleBrandChange,
  handleModelChange,
  handleYearChange
}) => {
  const vehicleOptions = [
    { label: 'Carros e utilitários pequenos', value: 'cars' },
    { label: 'Motos', value: 'motorcycles' },
    { label: 'Caminhões e micro-ônibus', value: 'trucks' }
  ]

  const mapToOptions = (data) =>
    data?.map((item) => ({
      value: item.code,
      label: item.name
    })) || []

  const brandOptions = mapToOptions(brands)
  const selectedBrandOption =
    brandOptions.find((o) => o.value === selectedBrand) || null

  const modelOptions = mapToOptions(models)
  const selectedModelOption =
    modelOptions.find((opcao) => opcao.value === selectedModel) || null

  const yearOptions = mapToOptions(years)
  const selectedYearOption =
    yearOptions.find((opcao) => opcao.value === selectedYear) || null

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="typeCar">Tipo de Veículo</label>
          <SelectCustom
            value={vehicleOptions.find((opcao) => opcao.value === vehicleType)}
            onChange={handleVehicleChange}
            options={vehicleOptions}
            placeholder="Selecione o tipo do veículo"
            isSearchable={false}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="brand">Marca</label>
          <SelectCustom
            value={selectedBrandOption}
            onChange={handleBrandChange}
            options={brandOptions}
            placeholder="Selecione a marca"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="model">Modelo</label>
          <SelectCustom
            value={selectedModelOption}
            onChange={handleModelChange}
            options={modelOptions}
            placeholder="Selecione o modelo"
            isDisabled={!selectedBrand}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="year">Ano</label>
          <SelectCustom
            value={selectedYearOption}
            onChange={handleYearChange}
            options={yearOptions}
            placeholder="Selecione o ano"
            isDisabled={!selectedModel}
          />
        </div>
      </div>
    </div>
  )
}

export default InputSelector
