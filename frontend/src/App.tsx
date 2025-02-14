import React, {useState} from 'react';
import logo from './logo.svg';
import CartoonButton from './components/button/button';
import Popup from './components/popup/popup';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Useless facts!</h1>
      <CartoonButton onClick={() => setShowPopup(true)}>
        Press Me!
      </CartoonButton>
      {showPopup && (
        <Popup
          text="Hello! This is your popup!"
          onClose={() => setShowPopup(false)}
        />
      )}
      </header>
    </div>
  );
}

export default App;
