import React, { useState } from 'react';
import * as Tone from 'tone';
import './starterstyles.css';
import { createNewSample } from '../api/songtraxAPI';

import { useNavigate } from 'react-router-dom';
// Make sure to import the CreateSample function from your API file if you haven't already.


const noteToFrequency = {
    "B": 493.88, // B4
    "A": 440.00, // A4
    "G": 392.00, // G4
    "F": 349.23, // F4
    "E": 329.63, // E4
    "D": 293.66, // D4
    "C": 261.63  // C4
};




function CreateSample() {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [instrument, setInstrument] = useState('Guitar');

    const [notes, setNotes] = useState({
        "B": Array(16).fill(false),
        "A": Array(16).fill(false),
        "G": Array(16).fill(false),
        "F": Array(16).fill(false),
        "E": Array(16).fill(false),
        "D": Array(16).fill(false),
        "C": Array(16).fill(false),
    });



    const handleToggleNote = (note, index) => {
        const updatedNotes = { ...notes };
        updatedNotes[note][index] = !updatedNotes[note][index];

        const frequency = noteToFrequency[note];
        if (!frequency) {
            console.error("Invalid note:", note);
            return;
        }

        if (updatedNotes[note][index]) {
            const synth = new Tone.Synth().toDestination();
            synth.triggerAttackRelease(frequency, "8n");
        }

        setNotes(updatedNotes);
    };

 const handleSubmit = async () => {
    try {
        console.log("handleSubmit triggered");

        const sampleData = {
            name: name,
            instrument: instrument,
            noteSequences: notes
        };
        console.log("Sample Data being sent:", sampleData);

        const response = await createNewSample(sampleData); // Pass the user data to createNewSample

        if (response && response.id) {
            console.log("Sample successfully added with ID:", response.id);
            navigate('/');
        } else {
            console.error('Failed to create sample:', response.message);
        }
    } catch (error) {
        console.error('Error while creating sample:', error);
    }
};



    return (
        <div className="main-container">
            <header className="page-header">
                <button className="back-button" onClick={() => navigate(-1)}><i className="fa fa-arrow-left"></i>←</button>
                <div className="header-logo">
                    <h2><a href="/" className="header-icon-link">SongTrax</a></h2>
                </div>
                <div className="header-app-description">
                    <span>Create & Share Location Based Music Samples!</span>
                </div>
            </header>

            <main>
                <h2 className="title">Edit Sample:</h2>
                <form className="card edit-card">
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Sample Name"
                    />
                    <div className="button-group-container">
                        <button type="button" className="bright-button" onClick={handleSubmit}>Save</button>
                    </div>
                </form>

                {/* Instrument toggles */}
                <div className="toggle-row-container">
                    <div className="row-label"><h4>Instrument</h4></div>
                    {['Piano', 'French Horn', 'Guitar', 'Drums'].map(instr => (
                        <button
                            key={instr}
                            className={instrument === instr ? "toggle-selected" : "toggle"}
                            onClick={() => setInstrument(instr)}
                        >
                            {instr}
                        </button>
                    ))}
                </div>

                {/* Notes sequence */}
                {Object.keys(notes).map(note => (
                    <div key={note} className="toggle-row-container">
                        <div className="row-label"><h4>{note}</h4></div>
                        {notes[note].map((isOn, index) => (
                            <button
                                key={index}
                                className={isOn ? "toggle-selected" : "toggle"}
                                onClick={() => handleToggleNote(note, index)}
                            >
                            </button>
                        ))}
                    </div>
                ))}
            </main>

            <footer className="page-footer"></footer>
        </div>
    );
}

export default CreateSample;
