import React, { useState } from 'react';
import CartoonButton from '../../components/button/button';
import Popup from '../../components/popup/popup';
import { getFact } from '../../service/factcall';
import buttonSound from '../../assets/buttonPress.mp3';
import notification from '../../assets/notification-sound.mp3';
import './HomePage.css';
import { appStyles,
  appHeaderStyles
} from './HomePage.styles';
import SteppedSlider from '../../components/stepped-slider/stepped-slider';

const HomePage = () => {
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

  const sliderSteps = [
    {
      mark: {value: 0},
      emoji: "🤓",
      label: "Quirky Tidbits"
    },
    {
      mark: {value: 1},
      emoji: "🤔",
      label: "Mildly Useless"
    },
    {
      mark: {value: 2},
      emoji: "🙃",
      label: "Nonsensical Nugget"
    },
    {
      mark: {value: 3},
      emoji: "😑",
      label: "Obvious truth"
    },
  ]

  return (
    <div style={appStyles}>
      <header style={appHeaderStyles}>
        <h1>Useless facts!</h1>
        <CartoonButton 
          onClick={fetchFact}
          disabled={loading}
          soundUrl={buttonSound}
        >
          {loading ? 'Loading...' : 'Press Me!'}
        </CartoonButton>

        <SteppedSlider
          steps={sliderSteps}
          value={0}
        ></SteppedSlider>
          
        
        {showPopup && (
          <Popup
            text={error || fact}
            onClose={() => setShowPopup(false)}
            soundUrl={buttonSound}
            openSound={notification}
          />
        )}
      </header>
    </div>
  );
}

export default HomePage;