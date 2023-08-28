import React, { useEffect, useState } from 'react';
import API from '../../utils/API';
import './Journal.css'
import ReadingForm from '../../components/ReadingForm/ReadingForm.tsx';
import 'react-datepicker/dist/react-datepicker.css';
import { redirect } from "react-router-dom";

function Journal({ token }) {
    const [addReadingVis, setAddReadingVis] = useState("none")
    const [addReadingBtnVis, setAddReadingBtnVis] = useState("")

    const addReadingStart = (event) => {
        event.preventDefault();
        setAddReadingBtnVis("none");
        setAddReadingVis("flex");
    }

    const [userReadings, setUserReadings] = useState([])
    const getUserReadings = async () => {
        const userReadingsData = await API.getAllUserReadings(localStorage.getItem("token"));
        userReadingsData.sort((a, b) => (b.readingDate > a.readingDate) ? 1 : -1)
        if(userReadingsData.message){
            console.log("Please Login to see your readings")
        } else {
            setUserReadings(userReadingsData)
        }
    }
    useEffect(() => {
        getUserReadings();
    }, [])

    const deleteReading = async (id) => {
        const deletedReading = await API.deleteReading(id, token)
        console.log(deletedReading)
        const newReadingsList = userReadings.filter(reading => {
            if(reading.id !== id){
                return reading
            }
        })
        setUserReadings(newReadingsList)
    }


    return (
        <main id="journalMain">
            <h1>Journal</h1>
            <button onClick={addReadingStart} style={{ display: addReadingBtnVis }}>Add a new Reading</button>
                    <ReadingForm token={token} addReadingVis={addReadingVis} setAddReadingVis={setAddReadingVis} setAddReadingBtnVis={setAddReadingBtnVis} setUserReadings={setUserReadings} getUserReadings={getUserReadings}/>
            <div style={{ display: addReadingBtnVis }}>
            {userReadings.map((reading, index) => {
                return (
                    <div className="journalReadings" key={index}>
                        <button onClick={() => deleteReading(reading.id)}>X</button>
                        <h2>{reading.question}</h2>
                        <p>{reading.generalTake}</p>
                        <div className='readingCards'>
                        {reading.Positions.map((position, index) => {
                            return <p key={index}>{position.position}: {position.Card.cardName}</p>
                        })}
                        </div>
                    </div>
                )
            })}
            </div>
        </main>
    )
}

export default Journal;