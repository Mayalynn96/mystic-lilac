import React, {useEffect, useState} from 'react';
import API from '../../utils/API';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Journal() {
    const [readingDate, setReadingDate] = useState(new Date());
    const [eventDate, setEventDate] = useState(new Date())

    const pastOnly = (date) => new Date() > date;

    return (
        <main>
            <h2>Journal</h2>
            <form>
                <label>
                    Reading Date:
                </label>
                <DatePicker selected={readingDate} onChange={(date) => setReadingDate(date)} filterDate={pastOnly} showMonthDropdown={true} showYearDropdown={true}/>
                <label>
                    Event Date:
                </label>
                <DatePicker selected={eventDate} onChange={(date) => setEventDate(date)} showMonthDropdown={true} showYearDropdown={true}/>
            </form>
        </main>
    )
}

export default Journal;