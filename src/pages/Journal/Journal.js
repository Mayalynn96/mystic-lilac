import React, { useEffect, useState } from 'react';
import API from '../../utils/API';
import './Journal.css'
import ReadingForm from '../../components/ReadingForm/ReadingForm.tsx';
import 'react-datepicker/dist/react-datepicker.css';

function Journal({token}) {

    return (
        <main id="journalMain">
            <h2>Journal</h2>
            <ReadingForm token={token}/>
        </main>
    )
}

export default Journal;