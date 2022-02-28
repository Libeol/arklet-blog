import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import api from "../items/api"
import Content from "../ui/Content";

function Article () {
    const { articleId } = useParams()
    console.log(articleId)
    const [articleInfo, setArticleInfo] = useState("")
    const [createdDate, setCreatedDate] = useState("")//作成日、最終更新日
    const [contentList, setContentList] = useState([])//コンテンツリスト
    const [articleTagList, setArticleTagList] = useState([])//この記事に紐付けられたタグリスト

    useEffect(() => {
        api.get(`/getArticleInfo/${articleId}`).then((response) => {
            setArticleInfo(response.data[0])
            console.log(response.data[0])
            let date = new Date(response.data[0].createdDate)
            console.log(date)
            let year = date.getFullYear()
            let month = date.getMonth()+1
            let day = date.getDate()
            let displayDate = `${year}/${month}/${day}`
            console.log(displayDate)
            setCreatedDate(displayDate)
        })
        api.get(`/getArticleTag/${articleId}`).then((response) => {
            setArticleTagList(response.data)
        })
        api.get(`/getArticleContent/${articleId}`).then((response) => {
            setContentList(response.data)
        })
    },[articleId])

    return(
        <>
        <h1>{articleInfo.articleTitle}</h1>
        <p>{createdDate}</p>
        {contentList.map((data, index) => {
            return(
                <Content key={index} data={data}/>
            )
        })}
        </>
    )
}
export default Article