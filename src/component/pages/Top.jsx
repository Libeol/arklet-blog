import { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import api from "../items/api"

function Top() {
    const history = useHistory()
    const [articleList, setArticleList] = useState([])//ランダムリスト
    const [latestList, setLatestList] = useState([])//最新
    const [topList, setTopList] = useState([])//トップ１０
    const [recommendList, setRecommendList] = useState([])//おすすめ
    const [keyWord, setKeyWord] = useState("最後")

    /* 記事の取得 */
    useEffect(() => {
        api.get("getRandomArticles").then((response) => {
            setArticleList(response.data)
        })
        api.get("getLatestArticles").then((response) => {
            setLatestList(response.data)
        })
        api.get("getRecommendArticles").then((response) => {
            setRecommendList(response.data)
        })
        api.get("getTopArticles").then((response) => {
            setTopList(response.data)
        })
    }, [])

    /* キーワード検索 */
    const searchKeyWord = () => {
        api.post("getKeywordArticles", {
            keyWord: keyWord
        }).then((response) => {
            setArticleList(response.data)
            console.log(response.data)
        })
    }

    return (
        <>
            <Link to={"/admin"}>admin</Link>
            <input value={keyWord} onChange={(e) => { setKeyWord(e.target.value) }} />
            <button onClick={searchKeyWord}>キーワード検索</button>
            {articleList.map((data, index) => {
                return (
                    <div key={index}>
                        <img alt="" src={data.articleImage} />
                        <h2>{data.articleTitle}</h2>
                        <p>{data.introText}</p>
                        <button onClick={() => { history.push({ pathname: `/article/${data.articleId}`, state: { articleId: data.articleId } }) }}>みる</button>
                    </div>
                )
            })}
        </>
    )
}
export default Top