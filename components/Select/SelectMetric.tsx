import React from 'react'
import { Select } from 'semantic-ui-react'

const metricOptions = [
  { key: 'cos', value: 1, text: 'Coseno' },
  { key: 'pear', value: 2, text: 'Pearson' },
  { key: 'euc', value: 3, text: 'Euclidea' },
]

const SelectMetric = () => (
  <Select placeholder='Select the metric to form the utility matrix' options={metricOptions} onChange={(e, data) => {
    
  }}/>
)



export default SelectMetric

