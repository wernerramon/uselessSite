import React, { useState, useEffect, useRef } from 'react';
import CartoonButton from '../../components/button/button';
import Popup from '../../components/popup/popup';
import { getFact } from '../../service/factcall';
import buttonSound from '../../assets/buttonPress.mp3';
import notification from '../../assets/notification-sound.mp3';
import './HomePage.css';
import { appStyles,
  appHeaderStyles
} from './HomePage.styles';
import { useMode } from '../../context/context';
import SteppedSlider from '../../components/stepped-slider/stepped-slider';

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [fact, setFact] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {isHardMode} = useMode();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateButtonPosition = () => {
    if (!buttonRef.current || !isHardMode) return { x: 0, y: 0 };

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const buttonCenter = {
      x: buttonRect.left + buttonRect.width / 2,
      y: buttonRect.top + buttonRect.height / 2
    };

    const distance = Math.sqrt(
      Math.pow(mousePosition.x - buttonCenter.x, 2) +
      Math.pow(mousePosition.y - buttonCenter.y, 2)
    );

    // Adjust these values to control the difficulty
    const ACTIVATION_RADIUS = isHardMode ? 150 : 100; // Increased radius for hard mode
    const MAX_FORCE = isHardMode ? 500 : 50; // Increased maximum push force
    const FORCE_MULTIPLIER = isHardMode ? 1.5 : 1; // Stronger reaction in hard mode

    if (distance < ACTIVATION_RADIUS) { 
      const angle = Math.atan2(
        mousePosition.y - buttonCenter.y,
        mousePosition.x - buttonCenter.x
      );
      const normalizedDistance = Math.max(0, (ACTIVATION_RADIUS - distance));
      const force = Math.min(
        MAX_FORCE, 
        (normalizedDistance / ACTIVATION_RADIUS) * MAX_FORCE * FORCE_MULTIPLIER
      );
      return {
        x: Math.cos(angle + Math.PI) * force,
        y: Math.sin(angle + Math.PI) * force
      };
    }

    return { x: 0, y: 0 };
  };

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

  const { x, y } = calculateButtonPosition();
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
        <div
          ref={buttonRef}
          style={{
            position: 'relative',
            transform: `translate(${x}px, ${y}px)`,
            transition: isHardMode ? 'transform 0.1s' : 'transform 0.3s ease-out'
          }}
        >
        <CartoonButton 
          onClick={fetchFact}
          disabled={loading}
          soundUrl={buttonSound}
        >
          {loading ? 'Loading...' : 'Press Me!'}
        </CartoonButton>
        </div>
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