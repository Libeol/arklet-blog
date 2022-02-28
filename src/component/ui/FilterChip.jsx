import { Adjust } from '@mui/icons-material'
import { Chip } from '@mui/material'
import React from 'react'

const FilterChip = ({ name, onDelete, unDeletable }) => {
    return (
        <>
            <Chip label={name} onDelete={onDelete}
                deleteIcon={unDeletable ? <Adjust /> : null} />
        </>
    )
}

export default FilterChip
