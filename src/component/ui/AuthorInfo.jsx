import { useState, memo } from "react"

const AuthorInfo = memo((props) => {
    const { data, editInfo } = props
    const [authorName, setAuthorName] = useState(data.authorName)
    const [comment, setComment] = useState(data.comment)

    const edit = () => {
        let info = {
            authorId:data.authorId,
            authorName:authorName,
            commnet:comment
        }
        editInfo(info)
    }
    return(
        <>
        <p>著者名</p>
        <input value={authorName} onChange={(e) => {setAuthorName(e.target.value)}}/>
        <p>紹介文</p>
        <textarea value={comment} onChange={(e) => {setComment(e.target.value)}}/>
        <br/>
        <button onClick={edit}>変更</button>
        </>
    )
})
export default AuthorInfo