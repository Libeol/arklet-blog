import { useState, memo, useEffect } from "react"
import React from "react"
import { storage } from "../items/firebase"
import { Link } from "react-router-dom"
import { Button, IconButton, ListItem, ListItemIcon, Menu, TextField, Tooltip } from "@mui/material"
import { Check, Close, Delete, DragIndicator, Edit, Facebook, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { Box } from "@mui/system"

const ContentForEdit = memo((props) => {
    const { data, index, upContent, downContent, editContent, deleteContent } = props
    const [isEdit, setIsEdit] = useState(false)
    const [text, setText] = useState(data.text)
    const [image, setImage] = useState("")
    const [preview, setPreview] = useState(data.text)
    const [pos, setPos] = useState(data.pos)

    /* 編集完了 */
    const edit = () => {
        let editData
        if (data.type === "g") {
            editData = {
                type: data.type,
                contentId: data.contentId,
                text: preview,
                pos: pos
            }
        } else {
            editData = {
                type: data.type,
                contentId: data.contentId,
                text: text,
                pos: pos
            }
        }
        editContent(editData)
        setIsEdit(false)
    }

    /* imageが変更された時に発動 */
    useEffect(() => {
        console.log(image)
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
                    setPreview(url)
                }
                )
            })
        }
    }, [image])

    /* 編集中の時のボタンたち */
    const buttons1 = <>
        <IconButton onClick={edit}><Check /></IconButton>
        <IconButton onClick={() => { deleteContent(index) }}><Delete /></IconButton>

    </>

    /*　編集中じゃない時のボタンたち */
    const buttons2 = <>
        <IconButton onClick={() => { upContent(index, data) }}><KeyboardArrowUp /></IconButton>
        <IconButton onClick={() => { setIsEdit(true) }}><Edit /></IconButton>
        <IconButton onClick={() => { downContent(index, data) }}><KeyboardArrowDown /></IconButton>
    </>

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    const dragButton = (
        <>
            <Tooltip title="クリックで開く">
                <ListItemIcon>
                    <IconButton onClick={handleClick}>
                        <DragIndicator />
                    </IconButton>
                </ListItemIcon>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClick={handleClose}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {buttons2}
            </Menu>
        </>
    )

    if (isEdit) {
        if (data.type === "a") {
            return (
                <>
                    ここに目次が表示されます
                    <button onClick={() => { upContent(index, data) }}>上に移動</button>
                    <button onClick={() => { downContent(index, data) }}>下に移動</button>
                    <button onClick={() => { deleteContent(index) }}>削除</button>
                </>
            )
        } else if (data.type === "b" || data.type === "c") {
            return (
                <>
                    <TextField label="見出し" value={text} onChange={(e) => { setText(e.target.value) }} />
                    {buttons1}
                </>
            )
        } else if (data.type === "d" || data.type === "e") {
            return (
                <>
                    <TextField label="標準テキスト" multiline maxRows={4} value={text} onChange={(e) => { setText(e.target.value) }} />
                    {buttons1}
                </>

            )
        } else if (data.type === "g") {
            return (
                <>
                    <label>画像追加</label>
                    <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} required />
                    <img src={preview} alt="" />
                    {buttons1}
                </>
            )
        } else if (data.type === "h") {
            return (
                <>
                    <p>位置</p>
                    <select className="cp_sl06" required value={pos} onChange={(e) => { setPos(e.target.value) }}>
                        <option value="left">左</option>
                        <option value="right">右</option>
                    </select>
                    <p>文章</p>
                    <input value={text} onChange={(e) => { setText(e.target.value) }} />
                    {buttons1}
                </>
            )
        }
    } else {
        if (data.type === "a") {
            return (
                <ListItem>
                    <Tooltip title="クリックで開く">
                        <ListItemIcon>
                            <IconButton onClick={handleClick}>
                                <DragIndicator />
                            </IconButton>
                        </ListItemIcon>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClick={handleClose}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <IconButton onClick={() => { upContent(index, data) }}><KeyboardArrowUp /></IconButton>
                        <IconButton onClick={() => { deleteContent(index) }}><Close /></IconButton>
                        <IconButton onClick={() => { downContent(index, data) }}><KeyboardArrowDown /></IconButton>
                    </Menu>
                    ここに目次が表示されます
                </ListItem>
            )
        } else if (data.type === "b") {
            return (
                <ListItem>
                    {dragButton}

                    <h1>{text}</h1>
                </ListItem>

            )
        } else if (data.type === "c") {
            return (
                <ListItem>
                    {dragButton}

                    <h2>{text}</h2>
                </ListItem>
            )
        } else if (data.type === "d") {
            return (
                <ListItem>
                    {dragButton}

                    <div>{text}</div>
                </ListItem>
            )
        } else if (data.type === "e") {
            return (
                <ListItem>
                    {dragButton}
                    <Box>
                        {text.split("\n").map((item, index) => {
                            return (
                                <p key={index}>
                                    {item.split("¥").map((text, index) => {
                                        if (text.charAt(0) === "r" && text.charAt(1) === "r") {
                                            const a = text.slice(2);
                                            return (
                                                <React.Fragment key={index}>
                                                    <span className='red'>{a}</span>
                                                </React.Fragment>
                                            );
                                        } else if (text.charAt(0) === "y" && text.charAt(1) === "y") {
                                            const a = text.slice(2)
                                            console.log(a)
                                            return (
                                                <React.Fragment key={index}>
                                                    <span className='yellow'>{a}</span>
                                                </React.Fragment>
                                            )
                                        } else if (text.charAt(0) === "R" && text.charAt(1) === "R") {
                                            const a = text.slice(2)
                                            console.log(a)
                                            return (
                                                <React.Fragment key={index}>
                                                    <span className='red-cap'>{a}</span>
                                                </React.Fragment>
                                            )
                                        } else if (text.charAt(0) === "Y" && text.charAt(1) === "Y") {
                                            const a = text.slice(2)
                                            console.log(a)
                                            return (
                                                <React.Fragment key={index}>
                                                    <span className='yellow-cap'>{a}</span>
                                                </React.Fragment>
                                            )
                                        } else if (text.charAt(0) === "C" && text.charAt(1) === "C") {
                                            const a = text.slice(2)
                                            console.log(a)
                                            return (
                                                <React.Fragment key={index}>
                                                    <span className='cap'>{a}</span>
                                                </React.Fragment>
                                            )
                                        } else if (text.charAt(0) === "t" && text.charAt(1) === "t") {
                                            const a = text.slice(2)
                                            console.log(a)
                                            const b = a.split("$$$")
                                            console.log(b)
                                            return (
                                                <a key={index} href={b[1]}>{b[0]}</a>
                                            )
                                        } else if (text.charAt(0) === "T" && text.charAt(1) === "T") {
                                            const a = text.slice(2)
                                            console.log(a)
                                            const b = a.split("$$$")
                                            console.log(b)
                                            return (
                                                <Link key={index} to={`/article/${b[1]}`}>{b[0]}</Link>
                                            )
                                        } else {
                                            return (
                                                <React.Fragment key={index}>
                                                    {text}
                                                </React.Fragment>
                                            );
                                        }
                                    })}
                                </p>
                            )
                        })}
                    </Box>
                </ListItem>
            )
        } else if (data.type === "g") {
            return (
                <ListItem>
                    {dragButton}

                    <img alt="" src={data.text} />
                </ListItem>
            )
        } else if (data.type === "h") {
            return (
                <ListItem>
                    {dragButton}
                    会話
                    {data.pos === "left" ?
                        <label>：左</label>
                        :
                        <label>：右</label>
                    }
                    <p>{data.text}</p>
                </ListItem>
            )
        }
    }

})

export default ContentForEdit