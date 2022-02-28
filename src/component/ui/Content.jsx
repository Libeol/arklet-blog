import { useState, memo, useEffect } from "react"
import { Link } from "react-router-dom"
import React from "react"

const Content = memo((props) => {
    const { data, mokujiList } = props
    console.log(mokujiList)
    if(data.type === "a"){
      return(
          <div>
            目次
            {mokujiList.map((item, index) => {
              if(item !== null){
                if(item.type === "b"){
                  return(
                    <h3 key={index}>{item.text}</h3>
                  )
                }else{
                  return(
                    <h4 key={index}>{item.text}</h4>
                  )
                }
              } 
            })}
          </div>
      )
    }else if(data.type === "b"){
      return(
          <>
          <h1>{data.text}</h1>
          </>
          
      )
    }else if(data.type === "c"){
      return(
          <>
          <h2>{data.text}</h2>
          </>
      )
    }else if(data.type === "d"){
      return(
          <>
          <div>{data.text}</div>
          </>
      )
    }else if(data.type === "e"){
      return(
          <>
          {data.text.split("\n").map((item, index) => {
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
                                  <span className='yelloq-cap'>{a}</span>
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
                              <Link key={index} to={b[1]}>{b[0]}</Link>
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
        </>
      )
    }else if(data.type === "g"){
      return(
          <>
          <img alt="" src={data.text}/>
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
          </div>
      )
    }
})

export default Content
