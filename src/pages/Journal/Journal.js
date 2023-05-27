import React, { useEffect, useState } from 'react';
import API from '../../utils/API';
import DatePicker from 'react-datepicker';
import './Journal.css'
import 'react-datepicker/dist/react-datepicker.css';
import { Slider } from '@mui/material';

function Journal() {
    const [readingDate, setReadingDate] = useState(new Date());
    const [eventDate, setEventDate] = useState(new Date());
    const [question, setQuestion] = useState('')
    const [generalTake, setGeneralTake] = useState('')
    const [outcome, setOutcome] = useState('')
    const [accuracy, setAccuracy] = useState(50);

    const handleChange = (e) => {
        e.preventDefault();

        if (e.target.id === "questionInput") {
            setQuestion(e.target.value)
        } else if (e.target.id === "generalTakeInput") {
            setGeneralTake(e.target.value)
        } else if (e.target.id === "outcomeInput") {
            setOutcome(e.target.value)
        } else if (e.target.id === "accuracy") {
            setAccuracy(e.target.value)
        }
    }

    const handleChange2 = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setAccuracy(newValue);
        }
    };

    return (
        <main>
            <h2>Journal</h2>
            <form>
                <label>Reading Date:</label>
                <DatePicker selected={readingDate} onChange={(date) => setReadingDate(date)} maxDate={new Date()} showMonthDropdown={true} showYearDropdown={true} />
                <label>Event Date:</label>
                <DatePicker placeholderText='No event date' isClearable={true} minDate={readingDate} selected={eventDate} onChange={(date) => setEventDate(date)} showMonthDropdown={true} showYearDropdown={true} />
                <label>Question:</label>
                <input type='text' id='questionInput' value={question} onChange={handleChange} />
                <label>General Take:</label>
                <textarea id='generalTakeInput' value={generalTake} onChange={handleChange} />
                <label>Outcome:</label>
                <input type='text' id='outcomeInput' value={outcome} onChange={handleChange} />
                <label>Accuracy:</label>
                <Slider id="accuracyInput" aria-label="accuracy" value={accuracy} onChange={handleChange2} color="secondary" min={0} max={100} />
                <p>{accuracy}</p>
            </form>
        </main>
    )
}

export default Journal;