import { useLocation } from "react-router-dom"
import Content from "../ui/Content"
import { useEffect, useState } from "react"
import React from "react"
import ContentForEdit from "../ui/ContentForEdit"
import CreateContent from "../ui/CreateContent"
import api from "../items/api"
import { storage } from "../items/firebase"
import { Button, Container, Grid, List, Menu, Stack } from "@mui/material"
import FilterChip from "../ui/FilterChip"
import CheckBox from "../ui/CheckBox"
import "./CreateArticle.css"
import { Box, ThemeProvider } from "@mui/system"
import { Theme } from "../ui/Theme"

function CreateArticle() {
    const { state } = useLocation()

    const [articleId, setArticleId] = useState(0)
    const [title, setTitle] = useState("")
    const [authorId, setAuthorId] = useState("")
    const [tagList, setTagList] = useState([])
    const [articleTagList, setArticleTagList] = useState([])
    const [image, setImage] = useState("")
    const [articleImage, setArticleImage] = useState("")
    const [introText, setIntroText] = useState("")
    const [contentList, setContentList] = useState([])
    const [mokujiList, setMokujiList] = useState([])
    const [authorList, setAuthorList] = useState([])
    const [previewMode, setPreviewMode] = useState(false)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const tagOen = (event) => setAnchorEl(event.currentTarget);
    const tagClose = () => setAnchorEl(null);

    /* この記事のコンテンツを取得 */
    useEffect(() => {
        console.log(state.articleId)
        if (state.articleId !== 0) {
            api.get(`getArticleInfo/${state.articleId}`).then((response) => {
                console.log(response.data[0])

                setArticleId(response.data[0].articleId)
                setTitle(response.data[0].articleTitle)
                setAuthorId(response.data[0].authorId)
                setArticleImage(response.data[0].articleImage)
                setIntroText(response.data[0].introText)
            })
            api.get(`getArticleContent/${state.articleId}`).then((response) => {
                setContentList(response.data)
                console.log(response.data)
            })
            api.get(`getArticleTag/${state.articleId}`).then((response) => {
                console.log(response.data)
                setArticleTagList(response.data.map((data) => {
                    return (data.tagName)
                }))
            })
        }
        /* タグ一覧取得 */
        api.get("getTagList").then((response) => {
            console.log("タグリスト" + response.data)
            setTagList(response.data)
        })
        /* 著者一覧 */
        api.get("getAuthorList").then((response) => {
            setAuthorList(response.data)
        })
    }, [state.articleId])

    /* 目次リストに追加 */
    useEffect(() => {
        setMokujiList(contentList.map((data) => {
            if (data.type === "b" || data.type === "c") {
                return (data)
            } else {
                return (null)
            }
        }))
    }, [contentList])

    /* imageが変更された時に発動 */
    useEffect(() => {
        if (image !== "") {
            let blob = new Blob([image], { type: "image/jpeg" })
            const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
            const N = 30;
            const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[n % S.length]).join('');
            const uploadRef = storage.ref("images").child(fileName);
            const uploadTask = uploadRef.put(blob);
            uploadTask.then(() => {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    console.log(url)
                    setArticleImage(url)
                }
                )
            })
        }
    }, [image])

    /* コンテンツを追加 */
    const addContent = async (index, data) => {
        console.log(data)
        const list = contentList
        const a = await resetContentList()
        console.log(a)
        if (index === -1) {
            list.unshift(data)
            console.log(list)
            setContentList(list)
        } else {
            list.splice(index + 1, 0, data)
            setContentList(list)
        }
    }

    /* コンテンツを編集 */
    const editContent = (data) => {
        setContentList(contentList.map((value) => {
            if (value.contentId === data.contentId) {
                return (data)
            } else {
                return (value)
            }
        }))
    }

    /* コンテンツを削除 */
    const deleteContent = async (index) => {
        const list = contentList
        console.log(list)
        const a = await resetContentList()
        console.log(a)
        list.splice(index, 1)
        setContentList(list)
    }

    /* コンテンツを上に移動 */
    const upContent = async (index, data) => {
        const list = contentList
        console.log(list)
        const a = await resetContentList()
        console.log(a)
        list.splice(index, 1)
        console.log(list)
        list.splice(index - 1, 0, data)
        console.log(list)
        setContentList(list)
    }

    /* コンテンツを下に移動 */
    const downContent = async (index, data) => {
        const list = contentList
        console.log(list)
        const a = await resetContentList()
        console.log(a)
        list.splice(index, 1)
        console.log(list)
        list.splice(index + 1, 0, data)
        console.log(list)
        setContentList(list)
    }

    /* リストを一度初期化してサイレンダリングを起こさせる */
    const resetContentList = () => {
        setContentList([])
        return "リスト初期化完了"
    }

    /*　タグ関係 */
    const addTag = (tagName) => {
        console.log(tagName)
        setArticleTagList([...articleTagList, tagName])
    }

    const deleteTag = (tagName) => {
        setArticleTagList(articleTagList.map((data) => {
            if (data === tagName) {
                return (null)
            } else {
                return (data)
            }
        }))
    }

    useEffect(() => {
        console.log(articleTagList)
    }, [articleTagList])

    /* 保存 */
    const saveArticle = (auto, publish) => {
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const a = `${year}/${month}/${day}`
        /*　オートセーブの場合は１ */
        if (auto === 1) {
            if (articleId === 0) {
                /* 新規保存 */
                api.post("autoSaveNewArticle", {
                    articleTitle: title,
                    createdDate: a,
                    authorId: authorId,
                    articleImage: articleImage,
                    introText: introText
                }).then((response) => {
                    console.log(response.data.message)
                    setArticleId(response.data.articleId)
                    api.post("/addNewContent", {
                        articleId: response.data.articleId,
                        contentList: contentList
                    })
                    api.post("addArticleTag", {
                        articleId: response.data.articleId,
                        tagList: articleTagList
                    })
                })
            } else {
                api.post("autoUpDateArticle", {
                    articleId: articleId,
                    articleTitle: title,
                    createdDate: a,
                    authorId: authorId,
                    articleImage: articleImage,
                    introText: introText
                })
                api.post(`deletePreContent/${articleId}`).then((response) => {
                    console.log(response.data.message)
                    api.post("/addNewContent", {
                        articleId: articleId,
                        contentList: contentList
                    })
                })
                api.post(`deleteArticleTag/${articleId}`).then((response) => {
                    console.log(response.data.message)
                    api.post("addArticleTag", {
                        articleId: articleId,
                        tagList: articleTagList
                    })
                })
            }
        } else {
            if (articleId === 0) {
                api.post("saveNewArticle", {
                    articleTitle: title,
                    createdDate: a,
                    authorId: authorId,
                    articleImage: articleImage,
                    introText: introText,
                    publish: publish
                }).then((response) => {
                    console.log(response.data.message)
                    setArticleId(response.data.articleId)
                    api.post("/addNewContent", {
                        articleId: response.data.articleId,
                        contentList: contentList
                    })
                    api.post("addArticleTag", {
                        articleId: response.data.articleId,
                        tagList: articleTagList
                    })
                })
            } else {
                api.post("upDateArticle", {
                    articleId: articleId,
                    articleTitle: title,
                    createdDate: a,
                    authorId: authorId,
                    articleImage: articleImage,
                    introText: introText,
                    publish: publish
                })
                api.post(`deletePreContent/${articleId}`).then((response) => {
                    console.log(response.data.message)
                    api.post("/addNewContent", {
                        articleId: articleId,
                        contentList: contentList
                    })
                })
                api.post(`deleteArticleTag/${articleId}`).then((response) => {
                    console.log(response.data.message)
                    api.post("addArticleTag", {
                        articleId: articleId,
                        tagList: articleTagList
                    })
                })
            }
        }
    }



    if (previewMode) {
        return (
            <div style={{ backgroundColor: "#f3f3f3", margin: 0 }}>
                <h1 style={{ paddingTop: "10px" }}>プレビュー</h1>
                <button onClick={() => { setPreviewMode(false) }}>編集に戻る</button>
                <button onClick={() => { saveArticle(0, 0) }}>一時保存</button>
                <button onClick={() => { saveArticle(0, 1) }}>公開する</button>
                <ThemeProvider theme={Theme}>
                    <Container>
                        <Grid container spacing={10} sx={{ mt: 4, boxSizing: "border-box" }}>
                            <Grid item xs={9}  >
                                <Box sx={{ px: 8, py: 8, bgcolor: "white", mb: 5, boxSizing: "border-box" }}>
                                    {contentList.map((data, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <Content data={data} mokujiList={mokujiList} />
                                            </React.Fragment>
                                        )
                                    })}
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box fullWidth sx={{ height: "100vh", backgroundColor: "#cccccc" }}>サイドバー</Box>
                            </Grid>
                        </Grid>
                    </Container>
                </ThemeProvider>
            </div>
        )
    } else {
        return (
            <ThemeProvider theme={Theme}>
                <Container>
                    <h1>新規記事作成</h1>
                    <p>タイトル</p>
                    <input value={title} onChange={(e) => { setTitle(e.target.value) }} />
                    <p>イントロ文章</p>
                    <input value={introText} onChange={(e) => { setIntroText(e.target.value) }} />
                    <p>サムネイル画像追加</p>
                    <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
                    <img src={articleImage} alt="" />
                    <p>著者</p>
                    <select className="cp_sl06" required value={authorId} onChange={(e) => { setAuthorId(e.target.value) }}>
                        <option value="" hidden disabled></option>
                        {authorList.map((data, index) => {
                            return (
                                <option key={index} value={data.authorId}>{data.authorName}</option>
                            )
                        })}
                    </select>
                    <Grid item xs={3}>
                        <Button variant="outlined" fullWidth sx={{ height: "100%", }} color="inherit" onClick={tagOen}>タグ</Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={tagClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {tagList.map((data, index) => {
                                return (
                                    <CheckBox key={index} name={data.tagName} list={articleTagList}
                                        add={addTag} del={deleteTag} />
                                )
                            })}
                        </Menu>
                    </Grid>
                    <Stack direction={"row"} spacing={1} sx={{ mt: 1 }}>
                        {articleTagList.map((data, index) => {
                            if (data !== null)
                                return (
                                    <FilterChip key={index} name={data} onDelete={() => { deleteTag(data) }} />
                                )
                            return (null)
                        })}
                    </Stack>
                    <button onClick={() => { setPreviewMode(true) }}>プレビュー</button>
                    <br /><br /><br />
                    <h3>コンテンツ作成</h3>
                    <CreateContent index={-1} addContent={addContent} />
                    <List>
                        {contentList.map((data, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <ContentForEdit index={index} data={data} upContent={upContent}
                                        downContent={downContent} editContent={editContent} deleteContent={deleteContent} />
                                    <br />
                                    <CreateContent index={index} addContent={addContent} />
                                </React.Fragment>
                            )
                        })}
                    </List>
                </Container>
            </ThemeProvider>
        )
    }

}
export default CreateArticle;