import {memo,useState} from "react"
import api from "../items/api"
const TagItem=memo((props)=>{
    const {tagId, tagName}=props
    const [open,setOpen]=useState(true)
    const [edit,setEdit]=useState(false)
    const [item,setItem]=useState(tagName)

    const editItem=()=>{
        api.post(`editTagList`,{
            tagId:tagId,
            tagName:item
        })
        setEdit(false)
    }

    const deleteItem=()=>{
        api.post(`deleteTagList/${tagId}`)
        setOpen(false)
    }

    return(
        <div>
            {open ?
            <>
                {edit ?
                    <>
                    <input type="text" value={item} onChange={(e)=>{setItem(e.target.value)}}/>
                    <button onClick={editItem}>変更</button>
                    </>
                :
                <>
                    <label>{item}</label>
                    <button onClick={()=>{setEdit(true)}}>編集</button>
                    <button onClick={deleteItem}>削除</button>
                </>
                }
            </>
            :
            null}
            
        </div>
    )
})
export default TagItem