import React, { useState } from 'react';
import CartoonButton from './components/button/button';
import Popup from './components/popup/popup';
import { getFact } from './service/factcall';
import './App.css';
import SteppedSlider from './components/stepped-slider/stepped-slider';

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

  const sliderMarks = [
    {value: 0, label: "Test"},
    {value: 1, label: "Test2"},
    {value: 2, label: "Test3"},
    {value: 3, label: "Test4"}
  ]

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

        <SteppedSlider marks={sliderMarks} value={0}></SteppedSlider>''
        
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