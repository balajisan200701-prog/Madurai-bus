import React from 'react';

function BusCard({ bus, onClick }) {
  const customStyle = {
    '--card-gradient': bus.gradient,
    '--card-shadow': bus.shadow
  };

  return (
    <div className="bus-card" style={customStyle} onClick={onClick}>
      <div className="card-header">
        <div className="bus-number-badge">{bus.number}</div>
      </div>
      
      <div className="route-info">
        <div className="route-start">
          <span style={{ color: bus.color }}>●</span> {bus.start}
        </div>
        <div className="route-divider"></div>
        <div className="route-dest">
          <span style={{ color: '#adb5bd' }}>●</span> {bus.destination}
        </div>
      </div>
      
      <div className="card-footer">
        <span className="status-badge">
          {bus.fare ? 'Fare Available' : 'Fare not verified'}
        </span>
        <span className="status-badge">
          {bus.timings && bus.timings.length > 0 ? 'Timings Available' : 'Timing not verified'}
        </span>
      </div>
    </div>
  );
}

export default BusCard;
