import React, { useState } from 'react';

function BusDetails({ bus, onBack }) {
  const [direction, setDirection] = useState('forward');

  const customStyle = {
    '--card-gradient': bus.gradient,
    '--card-shadow': bus.shadow,
    '--dot-color': bus.color
  };

  // When going reverse, simply reverse the stops array
  const stopsToDisplay = direction === 'forward' ? bus.stops : [...bus.stops].reverse();
  const startPoint = direction === 'forward' ? bus.start : bus.destination;
  const endPoint = direction === 'forward' ? bus.destination : bus.start;

  return (
    <div className="details-view" style={customStyle}>
      <button className="nav-back" onClick={onBack}>
        ← Back to List
      </button>

      <div className="details-header" style={{ background: bus.gradient }}>
        <div className="dh-number">{bus.number}</div>
        <div className="dh-route">{startPoint} → {endPoint}</div>
      </div>

      <div className="info-cards">
        <div className="info-card">
          <div className="ic-title">Total Stops</div>
          <div className="ic-value">{bus.stops.length > 0 ? bus.stops.length : 'N/A'}</div>
        </div>
        <div className="info-card">
          <div className="ic-title">Est. Duration</div>
          <div className="ic-value">Not verified</div>
        </div>
      </div>

      {bus.fare ? (
        <div className="info-card" style={{ marginBottom: '30px' }}>
          <div className="ic-title">Fare Details</div>
          <div className="fare-grid">
            <div className="fare-item">
              <span>Ordinary</span>
              <span>₹{bus.fare.ordinary}</span>
            </div>
            <div className="fare-item">
              <span>LSS</span>
              <span>₹{bus.fare.lss}</span>
            </div>
            <div className="fare-item">
              <span>Express</span>
              <span>₹{bus.fare.express}</span>
            </div>
            <div className="fare-item">
              <span>AC/Deluxe</span>
              <span>₹{bus.fare.ac}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="info-card" style={{ marginBottom: '30px' }}>
           <div className="ic-title">Fare Details</div>
           <div className="ic-value" style={{color: '#6c757d', fontWeight: 500}}>Fare not verified</div>
        </div>
      )}

      <div className="direction-tabs">
        <button 
          className={`direction-tab ${direction === 'forward' ? 'active' : ''}`}
          onClick={() => setDirection('forward')}
        >
          {bus.start} → {bus.destination}
        </button>
        <button 
          className={`direction-tab ${direction === 'reverse' ? 'active' : ''}`}
          onClick={() => setDirection('reverse')}
        >
          {bus.destination} → {bus.start}
        </button>
      </div>

      <h3 className="route-section-title">Route Stops</h3>
      {stopsToDisplay.length > 0 ? (
        <div className="timeline">
          {stopsToDisplay.map((stop, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-dot"></div>
              <div className={`timeline-content ${idx === 0 || idx === stopsToDisplay.length - 1 ? 'highlight' : ''}`}>
                {stop}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-data">
          Route data not yet verified
        </div>
      )}

      <h3 className="route-section-title" style={{ marginTop: '30px' }}>Timings</h3>
      {bus.timings && bus.timings.length > 0 ? (
         <div className="no-data">
           {/* Placeholder for future timings rendering */}
         </div>
      ) : (
        <div className="no-data">
          Timing not verified
        </div>
      )}
    </div>
  );
}

export default BusDetails;
