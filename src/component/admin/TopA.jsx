import { useHistory } from "react-router-dom"
import Content from "../ui/Content"
import { useState } from "react"

function TopA(){
    const history = useHistory()

    return(
        <>
            <h1>Arkletブログ管理者ページ</h1>
            <button onClick={()=>{history.push({ pathname: "/admin/createArticle", state:{articleId:0}})}}>新規記事作成</button>
            <button onClick={()=>{history.push("/admin/settingArticle")}}>記事一覧</button>
            <button onClick={()=>{history.push("/admin/settingAuthor")}}>ライター情報</button>
            <button onClick={()=>{history.push("/admin/editTag")}}>タグ編集</button>
            {/*
            <p>{text}</p>
            <textarea onSelect={(e)=>{setText(e.target.value.substring(e.target.selectionStart, e.target.selectionEnd));console.log(e.target.selectionStart, e.target.selectionEnd)}} />
            */}
        </>
    )
}
export default TopA;