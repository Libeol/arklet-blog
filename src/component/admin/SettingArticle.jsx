import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import api from "../items/api"

function SettingArticle(){
    const history = useHistory()
    const [publishList, setPublishList] = useState([])
    const [unPublishList, setUnPublishList] = useState([])
    const [topList, setTopList] = useState([])
    const [recommendList, setRecommendList] = useState([])
    const [load, setLoad] = useState(false)

    /* 記事の取得 */
    useEffect(() => {
        setPublishList([])
        setUnPublishList([])
        setTopList([])
        setRecommendList([])
        api.get("getPublishArticles").then((response) => {
            setPublishList(response.data)
        })
        api.get("getUnPublishlArticles").then((response) => {
            setUnPublishList(response.data)
        })
        api.get("getRecommendArticles").then((response) => {
            setRecommendList(response.data)
        })
        api.get("getTopArticles").then((response) => {
            setTopList(response.data)
        })
    },[load])

    /* 記事を公開する */
    const publishArticle = (articleId) => {
        api.post(`publishArticle/${articleId}`).then((response) => {
            console.log(response.data.message)
            setLoad(!load)
        })
    }
    /* 記事を未公開にする */
    const unPublishArticle = (articleId) => {
        api.post(`unPublishArticle/${articleId}`).then((response) => {
            console.log(response.data.message)
            setLoad(!load)
        })
    }
    /* 記事をおすすめにする */
    const recommendArticle = (articleId) => {
        api.post(`recommendArticle/${articleId}`).then((response) => {
            console.log(response.data.message)
            setLoad(!load)
        })
    }

    const unRecommendArticle = (articleId) => {
        api.post(`unRecommendArticle/${articleId}`).then((response) => {
            console.log(response.data.message)
            setLoad(!load)
        })
    }

    return(
        <>
        <h2>トップの記事</h2>
        {topList.map((data, index) => {
            return(
                <div key={index}>
                    <img alt="" src={data.articleImage}/>
                    <h2>{data.articleTitle}</h2>
                    <p>{data.introText}</p>
                    {data.publish === 1 ?
                    <button onClick={()=>{unPublishArticle(data.articleId)}}>非公開にする</button>
                    :
                    <button onClick={()=>{publishArticle(data.articleId)}}>公開する</button>
                    }
                    {data.recommend === 1 ?
                    <button onClick={()=>{unRecommendArticle(data.articleId)}}>おすすめを外す</button>
                    :
                    <button onClick={()=>{recommendArticle(data.articleId)}}>おすすめにする</button>
                    }
                    <button onClick={()=>{history.push({pathname: "/admin/createArticle", state:{articleId:data.articleId}})}}>編集する</button>
                </div>
            )
        })}
        <h2>おすすめの記事</h2>
        {recommendList.map((data, index) => {
            return(
                <div key={index}>
                    <img alt="" src={data.articleImage}/>
                    <h2>{data.articleTitle}</h2>
                    <p>{data.introText}</p>
                    {data.publish === 1 ?
                    <button onClick={()=>{unPublishArticle(data.articleId)}}>非公開にする</button>
                    :
                    <button onClick={()=>{publishArticle(data.articleId)}}>公開する</button>
                    }
                    {data.recommend === 1 ?
                    <button onClick={()=>{unRecommendArticle(data.articleId)}}>おすすめを外す</button>
                    :
                    <button onClick={()=>{recommendArticle(data.articleId)}}>おすすめにする</button>
                    }
                    <button onClick={()=>{history.push({pathname: "/admin/createArticle", state:{articleId:data.articleId}})}}>編集する</button>
                </div>
            )
        })}
        <h2>未公開の記事</h2>
        {unPublishList.map((data, index) => {
            return(
                <div key={index}>
                    <img alt="" src={data.articleImage}/>
                    <h2>{data.articleTitle}</h2>
                    <p>{data.introText}</p>
                    {data.publish === 1 ?
                    <button onClick={()=>{unPublishArticle(data.articleId)}}>非公開にする</button>
                    :
                    <button onClick={()=>{publishArticle(data.articleId)}}>公開する</button>
                    }
                    {data.recommend === 1 ?
                    <button onClick={()=>{unRecommendArticle(data.articleId)}}>おすすめを外す</button>
                    :
                    <button onClick={()=>{recommendArticle(data.articleId)}}>おすすめにする</button>
                    }
                    <button onClick={()=>{history.push({pathname: "/admin/createArticle", state:{articleId:data.articleId}})}}>編集する</button>
                </div>
            )
        })}
        <h2>公開中の記事</h2>
        {publishList.map((data, index) => {
            return(
                <div key={index}>
                    <img alt="" src={data.articleImage}/>
                    <h2>{data.articleTitle}</h2>
                    <p>{data.introText}</p>
                    {data.publish === 1 ?
                    <button onClick={()=>{unPublishArticle(data.articleId)}}>非公開にする</button>
                    :
                    <button onClick={()=>{publishArticle(data.articleId)}}>公開する</button>
                    }
                    {data.recommend === 1 ?
                    <button onClick={()=>{unRecommendArticle(data.articleId)}}>おすすめを外す</button>
                    :
                    <button onClick={()=>{recommendArticle(data.articleId)}}>おすすめにする</button>
                    }
                    <button onClick={()=>{history.push({pathname: "/admin/createArticle", state:{articleId:data.articleId}})}}>編集する</button>
                </div>
            )
        })}
        </>
    )
}
export default SettingArticle