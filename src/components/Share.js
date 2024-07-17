import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './starterstyles.css';
import { getSample, updateSampleSharedStatus } from '../api/songtraxAPI';

function Share() {
    const [sample, setSample] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchSampleData() {
            try {
                const fetchedSample = await getSample(id);
                setSample(fetchedSample);
            } catch (error) {
                console.error("Error fetching sample:", error);
            }
        }

        fetchSampleData();
    }, [id]);

    const handleShareToggle = async () => {
        if (sample) {
            try {
                const updatedSample = await updateSampleSharedStatus(sample.id, !sample.shared);
                setSample(updatedSample);
            } catch (error) {
                console.error("Error updating shared status:", error);
            }
        }
    };

    if (!sample) return <div>Loading...</div>;

    return (
        <div>
            <header className="page-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <i className="fa fa-arrow-left"></i>←
                </button>
                <div className="header-logo">
                    <h2>
                        <a href="/" className="header-icon-link">SongTrax</a>
                    </h2>
                </div>
                <div className="header-app-description">
                    <span>Create & Share Location Based Music Samples!</span>
                </div>
            </header>

            <main>
                <h2 className="title">Share This Sample</h2>
                <div className="card">
                    <div className="song-details">
                        <h3>{sample.name}</h3>
                        <p>{sample.date}</p>
                    </div>
                    <div className="buttons">
                        <a href="#" className="bright-button">Preview</a>
                    </div>
                </div>

                <div className="toggle-row-container">
                    <div className="location-name-label">
                        <h4>Location 1</h4>
                    </div>
                    <div className="sequence-row-container">
                        <button
                            className={sample.shared ? "toggle-selected" : "toggle"}
                            onClick={handleShareToggle}
                        >
                            Shared
                        </button>
                        <button
                            className={!sample.shared ? "toggle-selected" : "toggle"}
                            onClick={handleShareToggle}
                        >
                            Not Shared
                        </button>
                    </div>
                </div>
            </main>

            <footer className="page-footer"></footer>
        </div>
    );
}

export default Share;
