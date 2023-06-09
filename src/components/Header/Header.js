import React, { useState } from 'react';
import './Header.css';

function Header({ isLoggedIn, logout, userId }) {
    const [navMoreVisibillity, setnavMoreVisibillity] = useState("none")
    const openMore = (e) => {
        if (navMoreVisibillity === "none") {
            setnavMoreVisibillity("flex")
        } else {
            setnavMoreVisibillity("none")
        }
    }
    
    const renderMore = () => {
        if (isLoggedIn) {
            return (
                <div id="navMore" style={{ display: navMoreVisibillity }}>
                    <a href="/allCards">Tarot Cards</a>
                    <a href="/journal">Journal</a>
                    <a href="/login" onClick={logout}>Logout</a>
                </div>
            )
        } else {
            return (
                <div id="navMore" style={{ display: navMoreVisibillity }}>
                    <a href="/allCards">Tarot Cards</a>
                    <a href="/login">Login</a>
                </div>
            )
        }
    }

    let userProfile = ''
    
    if(isLoggedIn){
        userProfile = `/profile/${userId}`
    } else {
        userProfile = `/login`
    }

    return (
        <header id="mainHeader">
            <h1>The Witching Web</h1>
            <div id="searchAndMore">
                <div id="searchBar">
                    <label htmlFor="searchInput">search</label>
                    <i id="navSearch" className="uil uil-search"></i>
                    <input id="searchInput" className="hidden" name="searchInput" type="text" placeholder="Search on page" />
                    <button id="searchBtn" className="hidden" type="button" >Search</button>
                </div>
                <div id="more">
                    <a href={userProfile}>
                        <i className="uil uil-user-circle"><h2>Profile</h2></i>
                    </a>
                    <a href="/home">
                        <i id="home" className="uil uil-home"><h2>home</h2></i>
                    </a>
                    <i id="moreI" className="uil uil-bars" onClick={openMore}><h2>more</h2></i>
                    {renderMore()}
                </div>
            </div>
        </header>
    )
}

export default Header;