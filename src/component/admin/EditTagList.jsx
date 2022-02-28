import { useState, useEffect } from "react"
import api from "../items/api"
import TagItem from "./TagItem"

function EditTagList() {
    const [ tagList, setTagList ] = useState([])
    const [ newTag, setNewTag ]=useState("")

    useEffect(() => {
        api.get("getTagList").then((response) => {
            setTagList(response.data)
            console.log(response.data)
        })
    },[])

    const addSeries=()=>{
        api.post("addTagList",{
            tagName:newTag
        })
        setTagList([...tagList,{tagName:newTag}])
        setNewTag("")
    }

    return (
        <div className="App">
        <h1>シリーズ追加</h1>
        <input type="text" value={newTag} onChange={(e)=>{setNewTag(e.target.value)}}/>
        <button onClick={addSeries}>追加</button>
        {tagList.map((data,index)=>{
        return(
            <TagItem key={index} tagId={data.tagId} tagName={data.tagName}/>
        )
        })}
        </div>
    );
}
export default EditTagList