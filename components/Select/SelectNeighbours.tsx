import React from 'react'
import { Select } from 'semantic-ui-react'

const neighborsOptions = [
    { key: 'sim', value: 1, text: '1' },
    { key: 'med', value: 2, text: '2' },
    { key: 'med', value: 3, text: '3' },
    { key: 'med', value: 4, text: '4' },
    { key: 'med', value: 5, text: '5' },
]

/** Select the number of neigbors and update the state */
const SelectNeighbours = (props: any) => {
    const { setNeighbours } = props
    return (
        <Select
            placeholder="Vecinos"
            options={neighborsOptions}
            onChange={(e, data) => {
                setNeighbours(data.value)
            }}
        />
    )
}

export default SelectNeighbours
