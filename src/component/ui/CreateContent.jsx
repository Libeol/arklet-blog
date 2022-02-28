import { useState, memo, useEffect } from "react"
import React from "react"
import api from "../items/api"
import { storage } from "../items/firebase"

const CreateContent = memo((props) => {
    const { index, addContent } = props
    const [type, setType] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [image, setImage] = useState("")
    const [preview, setPreview] = useState("")
    const typeList = [
        {typeValue:"a", typeName:"目次"}, 
        {typeValue:"b", typeName:"見出し大"},
        {typeValue:"c", typeName:"見出し中"},
        {typeValue:"d", typeName:"囲い"},
        {typeValue:"e", typeName:"標準テキスト"},
        {typeValue:"g", typeName:"画像"},
        {typeValue:"h", typeName:"会話"},
    ]
    const [articleList, setArticleList] = useState([])
    const [text, setText] = useState("")
    const [pos, setPos] = useState("")

    /* 追加関数 */
    const add = () => {
        const S = "1234567890";
        const N = 9;
        //コンテンツIDを作成
        const contentId = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[n % S.length]).join('');
        let data;
        if(type === "g"){
            data = {
                type:type,
                contentId:contentId,
                text:preview,//<=typeがgの時はpreviewを渡してあげる
                pos:pos
            }
        }else{
            data = {
                type:type,
                contentId:contentId,
                text:text,
                pos:pos
            }
        }
        addContent(index, data)
        setType("")
        setText("")
        setIsOpen(false)
    }

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
                    setPreview(url)
                }
                )
            })
        }
    },[image])

    /* 閉じる */
    const close = () => {
        setIsOpen(false)
        setType("")
    }

    /* ボタンたち */
    const buttons = <>
        <button onClick={add}>決定</button>
        <button onClick={close}>閉じる</button>
    </>

    if(isOpen){
        if(type === ""){
            return(
                <>
                <select className="cp_sl06" required  value={type} onChange={(e) => { setType(e.target.value) }}>
                <option value="" hidden disabled></option>
                {typeList.map((data,index) => {
                    return(
                        <option key={index} value={data.typeValue}>{data.typeName}</option>
                    )
                })}
                </select>
                {buttons}
                </>
            )
        }else if(type === "a"){
            return(
                <>
                この位置に目次を挿入されます
                {buttons}
                </>
            )
        }else if(type === "b" || type === "c"){
            return(
                <>
                <input value={text} onChange={(e) => {setText(e.target.value)}} />
                {buttons}
                </>
            )
        }else if(type === "d" || type === "e"){
            return(
                <>
                <textarea value={text} onChange={(e) => {setText(e.target.value)}}/>
                {buttons}
                </>
            )
        }else if(type === "g"){
            return(
                <>
                <label>画像追加</label>
                <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} required/>
                <img src={preview} alt="" />
                {buttons}
                </>
            )
        }else if(type === "h"){
            return(
                <>
                <p>位地</p>
                <select className="cp_sl06" required  value={pos} onChange={(e) => { setPos(e.target.value) }}>
                <option value="left">左</option>
                <option value="right">右</option>
                </select>
                <p>文章</p>
                <input value={text} onChange={(e) => {setText(e.target.value)}}/>
                {buttons}
                </>
            )
        }
    }else{
        return(
            <button onClick={()=>{setIsOpen(true)}}>追加</button>
        )
    }

})

export default CreateContent
