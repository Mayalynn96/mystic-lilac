import React, { useState, useEffect, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AllCards from "./pages/AllCards/AllCards";
import Profile from "./pages/Profile/Profile";
import Journal from "./pages/Journal/Journal";
import API from "./utils/API";

// const authState = {
//     isLoading: true,
//     isLoggedIn: false,
//     userData: null,
//     token: null,
//     error: null
// };

// const authReducer = (state, action) => {
//     console.log("authReducer", state, action);
//     switch (action.type) {
//         case 'authTokenStart':
//             return {
//                 ...state,
//                 token: action.payload
//             };
//         case 'authTokenNoneFound':
//             return {
//                 ...state,
//                 isLoading: false
//             };
//         case 'authTokenSuccess':
//             return {
//                 ...state,
//                 isLoading: false,
//                 isLoggedIn: true,
//                 userData: action.payload
//             };
//         case 'authTokenFail':
//             return {
//                 ...state,
//                 isLoading: false,
//                 token: null,
//                 error: action.payload
//             }
//         default:
//             return state;
//     }
// }

function App() {

    // const [state, dispatch] = useReducer(authReducer, authState);
    // console.log("render", state)

    const [token, setToken] = useState("");
    const [userId, setUserId] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     const savedToken = localStorage.getItem("token");

    //     if (savedToken) {
    //         dispatch({ type: 'authTokenStart', payload: savedToken })

    //         API.isValidToken(savedToken).then(tokenData => {
    //             if (tokenData.isValid) {
    //                 dispatch({type: 'authTokenSuccess', payload: tokenData.user})
    //             } else {
    //                 localStorage.removeItem("token")
    //                 dispatch({type: 'authTokenFail', payload: tokenData.msg})
    //             }
    //         })

    //     } else {
    //         dispatch({ type: 'authTokenNoneFound'})
    //     }
    // }, [])


    useEffect(() => {
        const savedToken = localStorage.getItem("token");

        if (savedToken) {
            API.isValidToken(savedToken).then(tokenData => {
                if (tokenData.isValid) {
                    setToken(savedToken);
                    setUserId(tokenData.user.id)
                    setIsLoggedIn(true)
                    setIsLoading(false)
                } else {
                    localStorage.removeItem("token")
                    setIsLoading(false)
                }
            })
        } else {
            setIsLoading(false)
        }
    },[]);

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
                <Route path="/journal" element={<Journal isLoggedIn={isLoggedIn} token={token} isLoading={isLoading} />} />
                <Route path="*" element={<h1>404 page not found</h1>} />
            </Routes>
        </BrowserRouter>


    );
}

export default App;
