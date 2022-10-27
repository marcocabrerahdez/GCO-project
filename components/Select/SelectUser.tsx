import React from 'react'
import { Select } from 'semantic-ui-react'

const UserOptions = [
    { key: '1', value: 1, text: '1' },
    { key: '2', value: 2, text: '2' },
    { key: '3', value: 3, text: '3' },
    { key: '4', value: 4, text: '4' },
    { key: '5', value: 5, text: '5' },
]

/** Select the number of neigbors and update the state */
const SelectUser = (props: any) => {
    const { setUser } = props
    return (
        <Select
            placeholder="Usuario"
            options={UserOptions}
            onChange={(event, data) => {
                setUser(data.value)
            }}
        />
    )
}

export default SelectUser