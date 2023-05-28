import React, { useEffect, useState } from 'react';
import API from '../../utils/API';
import DatePicker from 'react-datepicker';
import './Journal.css'
import 'react-datepicker/dist/react-datepicker.css';
import { Slider } from '@mui/material';

function Journal() {
    const [readingDate, setReadingDate] = useState(new Date());
    const [eventDate, setEventDate] = useState<Date | null>(new Date());
    const [question, setQuestion] = useState('')
    const [generalTake, setGeneralTake] = useState('')
    const [outcome, setOutcome] = useState('')
    const [accuracyInput, setAccuracyInput] = useState(0);
    const [accuracy, setAccuracy] = useState<Number | null>(0);

    const handleChange = (event) => {
        event.preventDefault();

        if (event.target.id === "questionInput") {
            setQuestion(event.target.value)
        } else if (event.target.id === "generalTakeInput") {
            setGeneralTake(event.target.value)
        } else if (event.target.id === "outcomeInput") {
            setOutcome(event.target.value)
        } else if (event.target.id === "accuracy") {
            setAccuracyInput(event.target.value)
        } else if (event.target.id === "readingDate") {
            setReadingDate(event.target.Value)
        } else if (event.target.id === "eventDate") {
            setEventDate(event.target.value)
        }
    }

    const handleChange2 = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setAccuracyInput(newValue);
        }
    };

    const disableEventDate = (event) => {
        event.preventDefault()

        if(event.target.id === "disableEventDate"){
            const eventDateInput = (document.getElementById("eventDate") as any);
        
        if(eventDateInput && !eventDateInput.disabled){
            eventDateInput.disabled = true;
            event.target.textContent = "Add Event Date";
            setEventDate(null)
        } else if (eventDateInput && eventDateInput.disabled){
            eventDateInput.disabled = false;
            event.target.textContent = "No Event Date";
        }
        } else if (event.target.id === "disableOutcome") {
            const outcomeInput = (document.getElementById("outcomeInput") as any);

            if(outcomeInput && !outcomeInput.disabled){
                outcomeInput.disabled = true;
                event.target.textContent = "Add Outcome";
                setOutcome('')
            } else if(outcomeInput && outcomeInput.disabled){
                outcomeInput.disabled = false;
                event.target.textContent = "No Outcome yet";
            }
        } else if (event.target.id === "disableAccuracy"){
            const disableAccuracy = (document.getElementById("accuracyInput") as any);
            const accuracyLabel = (document.getElementById("accuracyLabel") as any);

            if(disableAccuracy && disableAccuracy.style.display === ""){
                disableAccuracy.style.display = "none";
                accuracyLabel.style.display = "none";
                event.target.textContent = "Add Accuracy";
                setAccuracy(null)
            } else if(disableAccuracy && disableAccuracy.style.display === "none"){
                disableAccuracy.style.display = "";
                accuracyLabel.style.display = "";
                event.target.textContent = "No Accuracy yet";
                setAccuracy(accuracyInput)
            }
        }
    }

    return (
        <main id="journalMain">
            <h2>Journal</h2>
            <form id="readingForm">
                <label>Reading Date:</label>
                <input type="date" onChange={handleChange} id="readingDate" />
                <label>Event Date:</label>
                <input type="date" onChange={handleChange} id="eventDate" disabled={false} />
                <button id='disableEventDate' onClick={disableEventDate}>No Event Date</button>
                <label>Question:</label>
                <input type='text' id='questionInput' value={question} onChange={handleChange} />
                <label>General Take:</label>
                <textarea id='generalTakeInput' value={generalTake} onChange={handleChange} />
                <label>Outcome:</label>
                <input type='text' id='outcomeInput' value={outcome} onChange={handleChange} />
                <button id='disableOutcome' onClick={disableEventDate}>No Outcome yet</button>
                <label id='accuracyLabel'>Accuracy: {accuracyInput}%</label>
                <Slider id="accuracyInput" aria-label="accuracyInput" onChange={handleChange2} color="secondary" min={0} max={100} disabled={false}/>
                <button id='disableAccuracy' onClick={disableEventDate}>No Accuracy yet</button>
            </form>
        </main>
    )
}

export default Journal;