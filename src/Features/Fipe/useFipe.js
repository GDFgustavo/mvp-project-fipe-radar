// useFipeForm.ts
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

const fetchFipeData = async (url) => {
  const response = await fetch(`https://parallelum.com.br/fipe/api/v2/${url}`)
  if (!response.ok) throw new Error('Erro ao buscar dados da FIPE')
  return response.json()
}

const useBrands = (vehicleType) => {
  return useQuery({
    queryKey: ['brands', vehicleType],
    queryFn: () => fetchFipeData(`${vehicleType}/brands`)
  })
}

const useModels = (vehicleType, brandCode) => {
  return useQuery({
    queryKey: ['models', vehicleType, brandCode],
    queryFn: () => fetchFipeData(`${vehicleType}/brands/${brandCode}/models`),
    enabled: !!vehicleType && !!brandCode
  })
}

const useYears = (vehicleType, brandCode, modelCode) => {
  return useQuery({
    queryKey: ['years', vehicleType, brandCode, modelCode],
    queryFn: () =>
      fetchFipeData(
        `${vehicleType}/brands/${brandCode}/models/${modelCode}/years`
      ),
    enabled: !!vehicleType && !!brandCode && !!modelCode
  })
}

const useFipeDetails = (vehicleType, brandCode, modelCode, yearCode) => {
  return useQuery({
    queryKey: ['details', vehicleType, brandCode, modelCode, yearCode],
    queryFn: () =>
      fetchFipeData(
        `${vehicleType}/brands/${brandCode}/models/${modelCode}/years/${yearCode}`
      ),
    enabled: !!vehicleType && !!brandCode && !!modelCode && !!yearCode
  })
}

export const useFipeForm = () => {
  const [vehicleType, setVehicleType] = useState('cars')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

  const { data: brands, isLoading: loadingBrands } = useBrands(vehicleType)

  const { data: models, isLoading: loadingModels } = useModels(
    vehicleType,
    selectedBrand
  )

  const { data: years, isLoading: loadingYears } = useYears(
    vehicleType,
    selectedBrand,
    selectedModel
  )

  const { data: fipeDetails, isLoading: loadingDetails } = useFipeDetails(
    vehicleType,
    selectedBrand,
    selectedModel,
    selectedYear
  )

  const isLoading =
    loadingBrands || loadingModels || loadingYears || loadingDetails

  const handleVehicleChange = (e) => {
    setVehicleType(e.value)
    setSelectedBrand('')
    setSelectedModel('')
    setSelectedYear('')
  }

  const handleBrandChange = (e) => {
    setSelectedBrand(e.value)
    setSelectedModel('')
    setSelectedYear('')
  }

  const handleModelChange = (e) => {
    setSelectedModel(e.value)
    setSelectedYear('')
  }

  const handleYearChange = (e) => setSelectedYear(e.value)

  return {
    vehicleType,
    selectedBrand,
    selectedModel,
    selectedYear,
    brands,
    models,
    years,
    fipeDetails,
    isLoading,
    handleVehicleChange,
    handleBrandChange,
    handleModelChange,
    handleYearChange
  }
}
