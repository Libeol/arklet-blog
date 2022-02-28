import { Check } from "@mui/icons-material"
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material"
import { useEffect } from "react"
import { useState, memo } from "react"

const CheckBox = memo((props) => {
    const { name, add, del, list } = props
    const [isCheck, setIsCheck] = useState(false)

    const check = () => {
        add(name)
    }

    const deleteCheck = () => {
        del(name)
    }

    useEffect(() => {
        setIsCheck(false)
        list.forEach(e => {
            if (e === name)
                setIsCheck(prev => !prev)
        });
    }, [list])

    return (
        <>
            {isCheck ?
                <>
                    <MenuItem onClick={deleteCheck}>
                        <ListItemIcon>
                            <Check fontSize="small" color="secondary" />
                        </ListItemIcon>
                        <ListItemText>
                            {name}
                        </ListItemText>
                    </MenuItem>
                </>
                :
                <>
                    <MenuItem onClick={check}>
                        <ListItemIcon>
                            <Check fontSize="small" sx={{ color: "#ebebeb" }} />
                        </ListItemIcon>
                        <ListItemText>
                            {name}
                        </ListItemText>
                    </MenuItem>
                </>
            }
        </>
    )
})

export default CheckBox