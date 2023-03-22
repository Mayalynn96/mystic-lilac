//dev
const URL_PREFIX="http://localhost:3002"
//prod
// const URL_PREFIX="https://bg-journal-back.herokuapp.com"

const API = {
    getUserData:id=>{
        return fetch(`${URL_PREFIX}/api/users/${id}`).then(res=>res.json())
    },
    isValidToken:token=>{
        return fetch(`${URL_PREFIX}/api/users/isValidToken`,{
            headers:{
                "authorization":`Bearer ${token}`
            }
        }).then(res=>res.json())
    },
    login:userObj=>{
        return fetch(`${URL_PREFIX}/api/users/login`,{
            method:"POST",
            body:JSON.stringify(userObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
    },
    signup:userObj=>{
        return fetch(`${URL_PREFIX}/api/users`,{
            method:"POST",
            body:JSON.stringify(userObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
    },
    getAllCards:deckId=>{
        return fetch(`${URL_PREFIX}/api/cards/withDeck/${deckId}`).then(res=>res.json())
    },
}

export default API