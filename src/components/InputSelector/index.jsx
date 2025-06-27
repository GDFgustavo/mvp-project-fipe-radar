import SelectCustom from '../SelectCustom'

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
    { label: 'Carros', value: 'cars' },
    { label: 'Motos', value: 'motorcycles' },
    { label: 'Caminhões', value: 'trucks' }
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
    <>
      <div style={{ padding: '20px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxWidth: '600px'
          }}
        >
          <SelectCustom
            value={vehicleOptions.find((opcao) => opcao.value === vehicleType)}
            onChange={handleVehicleChange}
            options={vehicleOptions}
            placeholder="Selecione o tipo do veículo"
            isSearchable={false}
          />

          <SelectCustom
            value={selectedBrandOption}
            onChange={handleBrandChange}
            options={brandOptions}
            placeholder="Selecione uma marca"
          />

          <SelectCustom
            value={selectedModelOption}
            onChange={handleModelChange}
            options={modelOptions}
            placeholder="Selecione um modelo"
            isDisabled={!selectedBrand}
          />

          <SelectCustom
            value={selectedYearOption}
            onChange={handleYearChange}
            options={yearOptions}
            placeholder="Selecione o ano"
            isDisabled={!selectedModel}
          />
        </div>
      </div>
    </>
  )
}

export default InputSelector
