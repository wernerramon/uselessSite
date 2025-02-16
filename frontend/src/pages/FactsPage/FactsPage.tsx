import React, {useEffect, useState} from 'react';
import CartoonBrowserBox from '../../components/box/box';
import { factsPageStyles, factsListStyles, appHeaderStyles } from './FactsPage.styles';
import { getAllFacts } from '../../service/factcall';

interface IFact {
  fact: string;
  mode: number;
  factId: number;
}

const FactsPage = () => {
    const [allFacts, setAllFacts] = useState<IFact[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [reload, setReload] = useState<boolean>(false);

    const transformArray = (arr: (string | number)[]): IFact[] => {
      const result: IFact[] = [];
      
      for (let i = 0; i < arr.length; i += 3) {
        const fact = arr[i];
        const mode = arr[i + 1];
        const id = arr[i + 2];
    
        // Type checking for safety
        if (
          typeof fact === 'string' &&
          typeof mode === 'number' &&
          typeof id === 'number'
        ) {
          result.push({
            fact: fact,
            mode: mode,
            factId: id
          });
        }
      }
      
      return result;
    };
    
    const fetchAllFact = async () => {
        setLoading(true);
        setError(null);
        try {
          const result = await getAllFacts();
          if (result) {
            
            console.log("results: ", result)
            setAllFacts(transformArray(result));
          } else {
            setAllFacts([])
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to fetch fact');
        } finally {
          setLoading(false);
        }
      };
    useEffect(() => {
       fetchAllFact();
       setReload(false);
      }, [reload]);

  return (
    <div style={factsPageStyles}>
        <header style={appHeaderStyles}>
      <h1>Your Facts</h1>
      <div style={factsListStyles}>
        {!loading && allFacts.map((fact, index) => (
          <CartoonBrowserBox key={index} fact={fact} onChange={() => setReload(true)} />
        ))}
      </div>
      </header>
    </div>
  );
};

export default FactsPage;