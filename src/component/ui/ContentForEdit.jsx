import { useState, memo, useEffect } from "react"
import React from "react"
import { storage } from "../items/firebase"
import { Link } from "react-router-dom"

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
        if(data.type === "g"){
            editData = {
                type:data.type,
                contentId:data.contentId,
                text:preview,
                pos:pos
            }
        }else{
            editData = {
                type:data.type,
                contentId:data.contentId,
                text:text,
                pos:pos
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
    },[image])

    /* 編集中の時のボタンたち */
    const buttons1 =<>
        <button onClick={edit}>完了</button>
        <button onClick={()=>{deleteContent(index)}}>削除</button>
    </>

    /*　編集中じゃない時のボタンたち */
    const buttons2 =<>
        <button onClick={()=>{setIsEdit(true)}}>編集</button>
        <button onClick={()=>{upContent(index, data)}}>上に移動</button>
        <button onClick={()=>{downContent(index, data)}}>下に移動</button>
    </>
    
    if(isEdit){
        if(data.type === "a"){
            return(
                <>
                ここに目次が表示されます
                <button onClick={()=>{upContent(index, data)}}>上に移動</button>
                <button onClick={()=>{downContent(index, data)}}>下に移動</button>
                <button onClick={()=>{deleteContent(index)}}>削除</button>
                </>
            )
        }else if(data.type === "b" || data.type === "c"){
            return(
                <>
                <input value={text} onChange={(e) => {setText(e.target.value)}} />
                {buttons1}
                </>
            )
        }else if(data.type === "d" || data.type === "e"){
            return(
                <>
                <textarea value={text} onChange={(e) => {setText(e.target.value)}}/>
                {buttons1}
                </>
                
            )
        }else if(data.type === "g"){
            return(
                <>
                <label>画像追加</label>
                <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} required/>
                <img src={preview} alt="" />
                {buttons1}
                </>
            )
        }else if(data.type === "h"){
            return(
                <>
                <p>位地</p>
                <select className="cp_sl06" required  value={pos} onChange={(e) => { setPos(e.target.value) }}>
                <option value="left">左</option>
                <option value="right">右</option>
                </select>
                <p>文章</p>
                <input value={text} onChange={(e) => {setText(e.target.value)}}/>
                {buttons1}
                </>
            )
        }
    }else{
        if(data.type === "a"){
            return(
                <div>
                ここに目次が表示されます
                <button onClick={()=>{upContent(index, data)}}>上に移動</button>
                <button onClick={()=>{downContent(index, data)}}>下に移動</button>
                <button onClick={()=>{deleteContent(index)}}>削除</button>
                </div>
            )
        }else if(data.type === "b"){
            return(
                <>
                <h1>{text}</h1>
                {buttons2}
                </>
                
            )
        }else if(data.type === "c"){
            return(
                <>
                <h2>{text}</h2>
                {buttons2}
                </>
            )
        }else if(data.type === "d"){
            return(
                <>
                <div>{text}</div>
                {buttons2}
                </>
            )
        }else if(data.type === "e"){
            return(
                <>
                {text.split("\n").map((item, index) => {
                    return(
                        <p key={index}>
                      {item.split("¥").map((text, index) => {
                          if(text.charAt(0) === "r" && text.charAt(1) === "r"){
                              const a = text.slice(2);
                              return (
                                <React.Fragment key={index}>
                                  <span className='red'>{a}</span>
                                </React.Fragment>
                              );
                          }else if(text.charAt(0) === "y" && text.charAt(1) === "y"){
                            const a = text.slice(2)
                            console.log(a)
                            return(
                              <React.Fragment key={index}>
                                  <span className='yellow'>{a}</span>
                              </React.Fragment>
                            )
                          }else if(text.charAt(0) === "R" && text.charAt(1) === "R"){
                            const a = text.slice(2)
                            console.log(a)
                            return(
                              <React.Fragment key={index}>
                                  <span className='red-cap'>{a}</span>
                              </React.Fragment>
                            )
                          }else if(text.charAt(0) === "Y" && text.charAt(1) === "Y"){
                            const a = text.slice(2)
                            console.log(a)
                            return(
                              <React.Fragment key={index}>
                                  <span className='yellow-cap'>{a}</span>
                              </React.Fragment>
                            )
                          }else if(text.charAt(0) === "C" && text.charAt(1) === "C"){
                            const a = text.slice(2)
                            console.log(a)
                            return(
                              <React.Fragment key={index}>
                                  <span className='cap'>{a}</span>
                              </React.Fragment>
                            )
                          }else if(text.charAt(0) === "t" && text.charAt(1) === "t"){
                              const a = text.slice(2)
                              const b = a.split("$$$")
                              return(
                                <a key={index} href={b[1]}>{b[0]}</a>
                              )
                          }else if(text.charAt(0) === "T" && text.charAt(1) === "T"){
                            const a = text.slice(2)
                            const b = a.split("$$$")
                            return(
                              <Link key={index} to={`/article/${b[1]}`}>{b[0]}</Link>
                            )
                          }else{
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
              {buttons2}
              </>
            )
        }else if(data.type === "g"){
            return(
                <>
                <img alt="" src={data.text}/>
                {buttons2}
                </>
            )
        }else if(data.type === "h"){
            return(
                <div>
                会話
                {data.pos === "left" ?
                <label>：左</label>
                :
                <label>：右</label>
                }
                <p>{data.text}</p>
                {buttons2}
                </div>
            )
        }
    }
    
})

export default ContentForEdit
