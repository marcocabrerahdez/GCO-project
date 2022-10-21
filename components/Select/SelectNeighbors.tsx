import React from 'react'
import { Select } from 'semantic-ui-react'

const neighborsOptions = [
    { key: 'sim', value: 1, text: '1' },
    { key: 'med', value: 2, text: '2' },
    { key: 'med', value: 3, text: '3' },    
    { key: 'med', value: 4, text: '4' },    
    { key: 'med', value: 5, text: '5' },
]

const SelectNeighbors = () => (
    <Select placeholder='Select number of Neighbors' options={neighborsOptions} />
)

export default SelectNeighbors
