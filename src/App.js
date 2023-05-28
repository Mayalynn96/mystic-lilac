import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AllCards from "./pages/AllCards/AllCards";
import Profile from "./pages/Profile/Profile";
import Journal from "./pages/Journal/Journal.tsx";
import API from "./utils/API";


function App() {
    
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        console.log(savedToken)
        if (savedToken) {
            API.isValidToken(savedToken).then(tokenData => {
                if (tokenData.isValid) {
                    setToken(savedToken);
                    setUserId(tokenData.user.id)
                    setIsLoggedIn(true)
                } else {
                    localStorage.removeItem("token")
                }
            })
        }
    }, [])

    const logout = () => {
        setToken('');
        setUserId(0);
        setIsLoggedIn(false);
        localStorage.removeItem("token")
    }

    return (

        <BrowserRouter>
            <Header isLoggedIn={isLoggedIn} userId={userId} logout={logout} />
            <Routes>
                <Route path="/" element={<Home isLoggedIn={isLoggedIn} token={token} userId={userId} />} />
                <Route path="/home" element={<Home isLoggedIn={isLoggedIn} token={token} userId={userId} />} />
                <Route path="/login" element={<Login setToken={setToken} setUserId={setUserId} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/profile/:id" element={<Profile token={token} userId={userId} />} />
                <Route path="/allCards" element={<AllCards token={token} userId={userId} />} />
                <Route path="/journal" element={<Journal isLoggedIn={isLoggedIn} token={token} userId={userId} />} />
                <Route path="*" element={<h1>404 page not found</h1>} />
            </Routes>
        </BrowserRouter>


    );
}

export default App;
