import React, {useState} from 'react';

import './Header.css';

function Header() {
    const [navMoreVisibillity, setnavMoreVisibillity] = useState("none")
    const openMore = (e) => {
        if(navMoreVisibillity === "none"){
            setnavMoreVisibillity("flex")
        } else {
            setnavMoreVisibillity("none")
        }
    }
    return (
        <header id="mainHeader">
            <h1>Mystic Lilac</h1>
            <div id="searchAndMore"> 
                <div id="searchBar">
                    <label htmlFor="searchInput">search</label>
                    <i id="navSearch" className="uil uil-search"></i>
                    <input id="searchInput" className="hidden" name="searchInput" type="text" placeholder="Search on page"/>
                    <button id="searchBtn" className="hidden" type="button" >Search</button>
                </div>
                <div id="more">
                <a href="/profile">
                <i className="uil uil-user-circle"><h2>Profile</h2></i>
                </a>
                <a href="/home">
                <i id="home" className="uil uil-home"><h2>home</h2></i>
                </a>
                <i id="moreI" className="uil uil-bars" onClick={openMore}><h2>more</h2></i>
                <div id="navMore" style={{display:navMoreVisibillity}}>
                    <a href="/TarotCards/deck/?id=2">Tarot Cards</a>
                    <a href="/journal">Journal</a>
                    <a href="/api/users/logout">Logout</a>
                </div>
            </div>
            </div>
        </header>
    )
}

export default Header;