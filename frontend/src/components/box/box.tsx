import React from 'react';
import {
    cartoonBrowserBoxStyles,
    browserHeaderStyles,
    browserButtonsStyles,
    browserButtonCloseStyles,
    browserButtonMinimizeStyles,
    browserButtonMaximizeStyles,
    browserContentStyles,
    copyButtonStyles
  } from './box.styles';
import { deleteFactUser } from '../../service/factcall';

  interface IFact {
    fact: string;
    mode: number;
    factId: number;
  }

interface CartoonBrowserBoxProps {
  fact: IFact;
  onChange: () => void;
}

const CartoonBrowserBox: React.FC<CartoonBrowserBoxProps> = ({ fact, onChange }) => {
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
    
    const currentLabel = sliderSteps.find(step => step.mark.value === fact.mode)?.label || '';

    const handleCopyClick = () => {
        navigator.clipboard.writeText(fact.fact)
          .then(() => {
            alert('Fact copied to clipboard!'); 
          })
          .catch((err) => {
            console.error('Failed to copy fact: ', err);
          });
      };

    const handleDelete = async () => {
      const response = await deleteFactUser(fact.factId);
      onChange();
    }

    return (
      <div style={cartoonBrowserBoxStyles}>
        <div style={browserHeaderStyles}>
          <div style={browserButtonsStyles}>
          <span style={browserButtonCloseStyles} onClick={handleDelete}>
            ×
          </span>
          <span style={browserButtonMinimizeStyles}>
            ―
          </span>
          <span style={browserButtonMaximizeStyles}>
            ◻
          </span>
          </div>
          <div style={{ 
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          fontWeight: 'bold',
          color: '#000'
        }}>
          {currentLabel}
        </div>
        </div>
        <div style={browserContentStyles}>
          <p>{fact.fact}</p>
          <button style={copyButtonStyles} onClick={handleCopyClick}>
          Copy Fact
        </button>
        </div>
      </div>
    );
  };

export default CartoonBrowserBox;