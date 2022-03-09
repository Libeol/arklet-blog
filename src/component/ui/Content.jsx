import { useState, memo, useEffect } from "react"
import { Link } from "react-router-dom"
import React from "react"
import "./Content.css"
import { Avatar, Divider, Icon, Typography } from "@mui/material"
import { List } from "@mui/icons-material"
import { Box } from "@mui/system"

const Content = memo((props) => {
  const { data, mokujiList } = props
  if (data.type === "a") {
    return (
      <>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgb(194, 130, 219)", color: "white", p: "5px 30px", mt: 5 }}>
          <Icon
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1, mt: -0.5 }}
          >
            <List />
          </Icon>
          <Typography variant="h6" component="div" >
            目次
          </Typography>
        </Box>
        <div className="c-agenda">
          {mokujiList.map((item, index) => {
            if (item !== null) {
              if (item.type === "b") {
                return (
                  <h3 className="c-agenda-h1" key={index}>{item.text}</h3>
                )
              } else {
                return (
                  <h4 className="c-agenda-h2" key={index}>{item.text}</h4>
                )
              }
            }
          })}
        </div>
      </>
    )
  } else if (data.type === "b") {
    return (
      <div className="balloon">
        <h1 className="c-big">{data.text}</h1>
      </div>

    )
  } else if (data.type === "c") {
    return (
      <>
        <h2 className="c-mid">{data.text}</h2>
      </>
    )
  } else if (data.type === "d") {
    return (
      <>
        <div className="c-border">{data.text}</div>
      </>
    )
  } else if (data.type === "e") {
    return (
      <>
        {data.text.split("\n").map((item, index) => {
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
                      <span className='yelloq-cap'>{a}</span>
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
                  console.log(text)
                  const a = text.slice(2)
                  const b = a.split("$$$")
                  console.log(b[1])
                  return (
                    <a key={index} href={b[1]}>{b[0]}</a>
                  )
                } else if (text.charAt(0) === "T" && text.charAt(1) === "T") {
                  const a = text.slice(2)
                  const b = a.split("$$$")
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
      </>
    )
  } else if (data.type === "g") {
    return (
      <>
        <img className="c-img" alt="" src={data.text} />
      </>
    )
  } else if (data.type === "h") {
    return (
      <div className={data.pos === "left" ? "balloon1-left" : "balloon1-right"}>
        <p>{data.text}</p>
      </div>
    )
  }
})

export default Content
