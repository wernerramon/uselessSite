import React, { useState } from 'react';
import CartoonButton from './components/button/button';
import Popup from './components/popup/popup';
import { getFact } from './service/factcall';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [fact, setFact] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFact = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getFact();
      setFact(result);
      setShowPopup(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch fact');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Useless facts!</h1>
        <CartoonButton 
          onClick={fetchFact}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Press Me!'}
        </CartoonButton>
        
        {showPopup && (
          <Popup
            text={error || fact}
            onClose={() => setShowPopup(false)}
          />
        )}
      </header>
    </div>
  );
}

export default App;