import { CarIcon, MotorcycleIcon, TruckIcon } from '../../SvgIcons'
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
      <label htmlFor="vehicleType">Tipo de Veículo</label>

      <div className={styles.vehicleButtons}>
        <button
          className={`${styles.vehicleButton} ${
            vehicleType === 'cars' ? styles.active : ''
          }`}
          onClick={() => handleVehicleChange({ value: 'cars' })}
        >
          <CarIcon className={styles.svgs} />
          Carros e utilitários pequenos
        </button>
        <button
          className={`${styles.vehicleButton} ${
            vehicleType === 'motorcycles' ? styles.active : ''
          }`}
          onClick={() => handleVehicleChange({ value: 'motorcycles' })}
        >
          <MotorcycleIcon className={styles.svgs} />
          Motos
        </button>
        <button
          className={`${styles.vehicleButton} ${
            vehicleType === 'trucks' ? styles.active : ''
          }`}
          onClick={() => handleVehicleChange({ value: 'trucks' })}
        >
          <TruckIcon className={styles.svgs} />
          Caminhões e micro-ônibus
        </button>
      </div>

      <div className={styles.inputGrid}>
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
