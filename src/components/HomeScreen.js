import React from 'react';
import { Link } from 'react-router-dom';
import './starterstyles.css';
import HeaderAndFooter from './HeaderAndFooter';


function HomeScreen() {
  // Sample data for demonstration. In a real-world scenario, this could come from an API.
  const samples = [
    { id: 1, name: "Song Name 1", date: "Date Created 1" },
    { id: 2, name: "Song Name 2", date: "Date Created 2" },
    // ... other samples
  ];

  return (
  <div>
          <HeaderAndFooter />

    <div className="main-container">
      <h2 className="title">My Songs</h2>

      {samples.map(sample => (
        <section key={sample.id} className="sample">
          <div className="card">
            <div className="song-details">
              <h3>{sample.name}</h3>
              <p>{sample.date}</p>
            </div>
            <div className="button-group-container">
              <Link to={`/edit/${sample.id}`} className="bright-button">Edit</Link>
              <Link to={`/share/${sample.id}`} className="bright-button">Share</Link>
              {/* Add functionality for the Preview button using Tone.js as per your requirements */}
              <button className="bright-button">Preview</button>
                    <footer className="page-footer"></footer>
            </div>
            </div>
        </section>
      ))}

      <div className="create-card">
        <Link to="/create" className="full-button">Create Sample</Link>
      </div>
    </div>
        </div>

  );
}

export default HomeScreen;
