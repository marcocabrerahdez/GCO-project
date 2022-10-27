import React from 'react'
import { Select } from 'semantic-ui-react'

const metricOptions = [
  { key: 'cos', value: 1, text: 'Coseno' },
  { key: 'pear', value: 2, text: 'Pearson' },
  { key: 'euc', value: 3, text: 'Euclidea' },
]

/** Change the metric value of MatrixtoTable when change the event */
const SelectMetric = (props: any) => {
  const { setMetric } = props
  return (
    <Select
      placeholder="Metrica"
      options={metricOptions}
      onChange={(event, data) => {
        setMetric(data.value)
      }}
    />
  )
}

export default SelectMetric

