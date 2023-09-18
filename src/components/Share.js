import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './starterstyles.css';

function Share() {
  const [sample, setSample] = useState(null);
  const [isShared, setIsShared] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the sample by ID when the component mounts.
    // For demonstration, I'm using dummy data. Replace this with an actual API call.
    const fetchedSample = {
      id: 1,
      name: "Sample Name 1",
      date: "Date Created 1",
      shared: false
    };

    if (fetchedSample) {
      setSample(fetchedSample);
      setIsShared(fetchedSample.shared);
    }
  }, [id]);

  const handleShareToggle = () => {
    // Your share/unshare logic here
    console.log('Share toggle button clicked!'); // Placeholder
  };

  const handleBack = () => {
    navigate(-1);  // Go back to the previous page
  };

  if (!sample) return <div>Loading...</div>;

  return (
    <div>
          <div className="main-container"> {/* <-- add this wrapper */}

      <header className="page-header">
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
            <a href="#" className="bright-button">Preview</a> {/* Implement playback logic here */}
            <button onClick={handleShareToggle} className={isShared ? 'shared-button' : 'bright-button'}>
              {isShared ? 'Shared' : 'Share'}
            </button>
          </div>
        </div>
      </main>

      <footer className="page-footer"></footer>
    </div>
    </div>
  );
}

export default Share;
