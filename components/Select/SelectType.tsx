import React from 'react'
import { Select } from 'semantic-ui-react'

const predictionOptions = [
    { key: 'sim', value: 1, text: 'Predicción simple' },
    { key: 'med', value: 2, text: 'Diferencia con la media' },
]

const SelectType = () => (
    <Select placeholder='Select the type of prediction' options={predictionOptions}/>
)

export default SelectType