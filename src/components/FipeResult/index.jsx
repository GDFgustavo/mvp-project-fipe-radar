const FipeResult = ({
  brand,
  model,
  modelYear,
  fuel,
  codeFipe,
  price,
  referenceMonth
}) => {
  return (
    <div>
      <h3>Resultado FIPE</h3>
      <p>
        <strong>Marca:</strong> {brand}
      </p>
      <p>
        <strong>Modelo:</strong> {model}
      </p>
      <p>
        <strong>Ano:</strong> {modelYear}
      </p>
      <p>
        <strong>Combustível:</strong> {fuel}
      </p>
      <p>
        <strong>Código FIPE:</strong> {codeFipe}
      </p>
      <p>
        <strong>Preço:</strong> {price}
      </p>
      <p>Referência: {referenceMonth}</p>
    </div>
  )
}

export default FipeResult
