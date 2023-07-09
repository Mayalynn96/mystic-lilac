import React, { useEffect, useState } from 'react';
import API from '../../utils/API';
import './Journal.css'
import ReadingForm from '../../components/ReadingForm/ReadingForm.tsx';
import 'react-datepicker/dist/react-datepicker.css';

function Journal({ token }) {
    const [addReadingVis, setAddReadingVis] = useState("none")
    const [addReadingBtnVis, setAddReadingBtnVis] = useState("")

    const addReadingStart = (event) => {
        event.preventDefault();
        setAddReadingBtnVis("none");
        setAddReadingVis("flex");
    }

    const [userReadings, setUserReadings] = useState([])

    useEffect(() => {
        const getUserReadings = async () => {
            const userReadings = await API.getAllUserReadings(localStorage.getItem("token"));
            setUserReadings(userReadings)
        }
        getUserReadings();
    }, [])


    return (
        <main id="journalMain">
            <h1>Journal</h1>
            <button onClick={addReadingStart} style={{ display: addReadingBtnVis }}>Add a new Reading</button>
            <ReadingForm token={token} addReadingVis={addReadingVis} setAddReadingVis={setAddReadingVis} setAddReadingBtnVis={setAddReadingBtnVis} />
            <div style={{ display: addReadingBtnVis }}>
            {userReadings.map((reading, index) => {
                return (
                    <div className="journalReadings" key={index}>
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