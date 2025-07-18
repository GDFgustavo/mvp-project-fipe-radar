import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjAyODJiOS1mNWY1LTQ4YzItYmVjZS1kOThhZmRhMDI3YmIiLCJlbWFpbCI6Imd1c3Rhdm9hZ3VpYXIzOThAZ21haWwuY29tIiwiaWF0IjoxNzQ4OTcyODU0fQ.bCsFbJk1SY6jh5f8qp23SkLIbwx1q3jN7ae_t_bjf3E'
const BASE_URL = 'https://parallelum.com.br/fipe/api/v2'

const fetchFipeData = async (url) => {
  const response = await fetch(`${BASE_URL}/${url}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Erro ao buscar dados da FIPE')
  }
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

const useFipeDetails = (
  vehicleType,
  brandCode,
  modelCode,
  yearCode,
  shouldFetch
) => {
  return useQuery({
    queryKey: [
      'details',
      vehicleType,
      brandCode,
      modelCode,
      yearCode,
      shouldFetch
    ],
    queryFn: () =>
      fetchFipeData(
        `${vehicleType}/brands/${brandCode}/models/${modelCode}/years/${yearCode}`
      ),
    enabled: shouldFetch,
    staleTime: 0,
    cacheTime: 0
  })
}

export const useFipeForm = () => {
  const [vehicleType, setVehicleType] = useState('cars')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [shouldFetch, setShouldFetch] = useState(false)

  const resetForm = () => {
    setVehicleType('cars')
    setSelectedBrand('')
    setSelectedModel('')
    setSelectedYear('')
    setShouldFetch(false)
  }

  const { data: brands } = useBrands(vehicleType)

  const { data: models } = useModels(vehicleType, selectedBrand)

  const { data: years } = useYears(vehicleType, selectedBrand, selectedModel)

  const { data: fipeDetails, isLoading: loadingDetails } = useFipeDetails(
    vehicleType,
    selectedBrand,
    selectedModel,
    selectedYear,
    shouldFetch
  )

  const isLoading = loadingDetails

  const handleVehicleChange = (e) => {
    setVehicleType(e.value)
    setSelectedBrand('')
    setSelectedModel('')
    setSelectedYear('')
    setShouldFetch(false)
  }

  const handleBrandChange = (e) => {
    setSelectedBrand(e.value)
    setSelectedModel('')
    setSelectedYear('')
    setShouldFetch(false)
  }

  const handleModelChange = (e) => {
    setSelectedModel(e.value)
    setSelectedYear('')
    setShouldFetch(false)
  }

  const handleYearChange = (e) => {
    setSelectedYear(e.value)
    setShouldFetch(false)
  }

  const handleSubmit = () => {
    if (selectedBrand && selectedModel && selectedYear) {
      setShouldFetch(true)
    }
  }

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
    resetForm,
    handleSubmit,
    handleVehicleChange,
    handleBrandChange,
    handleModelChange,
    handleYearChange
  }
}
