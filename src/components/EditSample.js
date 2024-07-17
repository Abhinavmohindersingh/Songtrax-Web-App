import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSample, updateSample } from '../api/songtraxAPI';
import * as Tone from 'tone';

function EditSample() {
    const [name, setName] = useState('');
    const [instrument, setInstrument] = useState('Guitar');
    const { id } = useParams();
    const navigate = useNavigate();
    const [sampleName, setSampleName] = useState("");
    const [selectedInstrument, setSelectedInstrument] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [noteSequences, setNoteSequences] = useState({});
    const [notes, setNotes] = useState({
        "B": Array(16).fill(false),
        "A": Array(16).fill(false),
        "G": Array(16).fill(false),
        "F": Array(16).fill(false),
        "E": Array(16).fill(false),
        "D": Array(16).fill(false),
        "C": Array(16).fill(false),
    });
    const noteToFrequency = {
        "B": 493.88,
        "A": 440.00,
        "G": 392.00,
        "F": 349.23,
        "E": 329.63,
        "D": 293.66,
        "C": 261.63,
        "H": 587.33
    };

    const handleBack = () => {
        navigate(-1);
    };

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

    useEffect(() => {
        const fetchSample = async () => {
            try {
                const sample = await getSample(id);
                setSampleName(sample.name);
                setSelectedInstrument(sample.instrument);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching sample:", error);
            }
        };

        fetchSample();
    }, [id]);

    const handlePlayNote = (note) => {
        const frequency = noteToFrequency[note];
        if (!frequency) {
            console.error("Invalid note:", note);
            return;
        }

        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease(frequency, "8n");
    };

    const handleSave = async () => {
        try {
            const updatedSample = {
                name: sampleName,
                instrument: selectedInstrument,
                recording_data: JSON.stringify(noteSequences)
            };
            await updateSample(id, updatedSample);
            navigate('/path-to-success-page-or-home');
        } catch (error) {
            console.error("Error updating sample:", error);
        }
    };

    const handleNoteChange = (note, index, value) => {
        const updatedSequences = { ...noteSequences };
        updatedSequences[note][index] = value;
        setNoteSequences(updatedSequences);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <header className="page-header">
                <div className="header-logo">
                    <button onClick={handleBack} className="back-button">←</button>
                    <h2>
                        <a href="/" className="header-icon-link">SongTrax</a>
                    </h2>
                </div>
                <div className="header-app-description">
                    <span>Create & Share Location Based Music Samples!</span>
                </div>
            </header>

            <main>
                <h2 className="title">Editing This Sample:</h2>
                <form className="card edit-card" onSubmit={handleSave}>
                    <input
                        type="text"
                        value={sampleName}
                        onChange={e => setSampleName(e.target.value)}
                    />
                    <div className="button-group-container">
                        <button type="submit" className="bright-button">Save</button>
                    </div>
                </form>

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

                {Object.keys(notes).map(note => (
                    <div key={note} className="toggle-row-container">
                        <div className="row-label"><h4>{note}</h4></div>
                        {notes[note].map((isOn, index) => (
                            <button
                                key={index}
                                className={isOn ? "toggle-selected" : "toggle"}
                                onClick={() => handleToggleNote(note, index)}
                            />
                        ))}
                    </div>
                ))}
            </main>

            <footer className="page-footer"></footer>
        </div>
    );
}

export default EditSample;
