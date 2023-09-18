import React from 'react';
import './starterstyles.css';  // Make sure the path is correct based on your directory structure

function CreateSample() {
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
        <h2 className="title">Edit Sample:</h2>
        <form className="card edit-card">
          <input type="text" defaultValue="" />
          <div className="button-group-container">
            <button type="button" className="bright-button">Save</button>
          </div>
        </form>

        <div className="toggle-row-container">
          <div className="row-label">
            <h4>Instrument</h4>
          </div>
          <div className="sequence-row-container">
            <button className="toggle-selected">Guitar</button>
            <button className="toggle">Piano</button>
            <button className="toggle">Violin</button>
            <button className="toggle">Drums</button>
          </div>
        </div>

        <div className="toggle-row-container">
          <div className="row-label">
            <h4>B</h4>
          </div>
          <div className="sequence-row-container">
            {/* Your sequence of toggle buttons for "B" */}
          </div>
        </div>

        <div className="toggle-row-container">
          <div className="row-label">
            <h4>A</h4>
          </div>
          <div className="sequence-row-container">
            {/* Your sequence of toggle buttons for "A" */}
          </div>
        </div>
      </main>

      <footer className="page-footer"></footer>
    </div>
    </div>
  );
}

export default CreateSample;
