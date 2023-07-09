//dev
const URL_PREFIX="http://localhost:3002"
//prod
// const URL_PREFIX="https://bg-journal-back.herokuapp.com"

const API = {
    getUserData:async id=>{
        const res = await fetch(`${URL_PREFIX}/api/users/${id}`)
        return await res.json()
    },
    isValidToken:async token=>{
        const res = await fetch(`${URL_PREFIX}/api/users/isValidToken`, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
        return await res.json()
    },
    login:async userObj=>{
        const res = await fetch(`${URL_PREFIX}/api/users/login`, {
            method: "POST",
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type": "application/json"
            }
        })
        return await res.json()
    },
    signup:async userObj=>{
        const res = await fetch(`${URL_PREFIX}/api/users`, {
            method: "POST",
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type": "application/json"
            }
        })
        return await res.json()
    },
    getAllCards:async deckId=>{
        const res = await fetch(`${URL_PREFIX}/api/cards/withDeck/${deckId}`)
        return await res.json()
    },
    getAllCardsSimple:async ()=>{
        const res = await fetch(`${URL_PREFIX}/api/cards`);
        return await res.json();
    },
    createReading:async (readingObj, token) => {
        const res = await fetch(`${URL_PREFIX}/api/readings`, {
            method: "POST",
            body: JSON.stringify(readingObj),
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            }
        });
        return await res.json();
    },
    getAllUserReadings: async (token) => {
        const res = await fetch(`${URL_PREFIX}/api/readings`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${token}`
            }
        });
        return await res.json();
    }
}

export default API