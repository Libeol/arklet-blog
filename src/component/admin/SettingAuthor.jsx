import { useState, useEffect } from "react"
import api from "../items/api"
import AuthorInfo from "../ui/AuthorInfo"

function SettingAuthor(){
    const [authorList, setAuthorList] = useState([])

    useEffect(() => {
        api.get("/getAuthorList").then((response) => {
            setAuthorList(response.data)
        })
    },[])

    const editInfo = (info) => {
        api.post("/editAuthorInfo",{
            authorId:info.authorId,
            authorName:info.authorName,
            comment:info.comment
        })
    }   

    return(
        <>
        {authorList.map((data, index) => {
            return(
                <AuthorInfo key={index} data={data} editInfo={editInfo}/>
            )
        })}
        </>
    )
}
export default SettingAuthor