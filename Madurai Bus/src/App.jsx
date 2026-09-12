import React, { useState } from 'react';
import { buses } from './data/busData';
import BusCard from './components/BusCard';
import BusDetails from './components/BusDetails';

function App() {
  const [selectedBus, setSelectedBus] = useState(null);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="header-title">மதுரை</h1>
        <p className="header-subtitle">உங்கள் பேருந்து வழிகாட்டி</p>
      </header>
      
      <main className="content-area">
        {selectedBus ? (
          <BusDetails bus={selectedBus} onBack={() => setSelectedBus(null)} />
        ) : (
          <div className="bus-grid">
            {buses.map((bus) => (
              <BusCard 
                key={bus.number} 
                bus={bus} 
                onClick={() => setSelectedBus(bus)} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
