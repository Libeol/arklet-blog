import React, { useState } from 'react'
import "./Header.css"

const Header = () => {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(p => !p);
    }

    return (
        <div id="navArea" className={open && "open"}>

            <nav>
                <div class="inner">
                    <ul>
                        <li onClick={handleClick}><a href="#">Text</a></li>
                        <li onClick={handleClick}><a href="#">Text</a></li>
                        <li onClick={handleClick}><a href="#">Text</a></li>
                    </ul>
                </div>
            </nav>

            <div class="toggle_btn" onClick={handleClick}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div id="mask" onClick={handleClick}></div>

        </div>
    )
}

export default Header