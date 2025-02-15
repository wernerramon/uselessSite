import React, {useEffect, useState} from 'react';
import CartoonBrowserBox from '../../components/box/box';
import { factsPageStyles, factsListStyles, appHeaderStyles } from './FactsPage.styles';
import { getAllFacts } from '../../service/factcall';

const FactsPage = () => {
    const facts: string[] = ["Octopuses have three hearts, two pump blood to the gills and the rest of the body, while the third circulates blood within the heart itself.",
        "Octopuses have three hearts. Two pump blood to the gills, while the third pumps it to the rest of the body. This third heart is only used when the octopus is swimming, as its blood can also flow through the body without it by using the pressure of the water.",
        "Monkeys do not live in snow; they are found only in tropical and subtropical regions of the world, so it's a fact that monkeys never play in a winter wonderland.",
        "Octopuses have three hearts, two pump blood to the gills and the rest of the body, while the third circulates blood within the heart itself.",
        "Octopuses have three hearts, two pump blood to the gills and the rest of the body, while the third circulates blood within the heart itself."
    ]; // replace with call to BE to get facts

    const [allFacts, setAllFacts] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fetchAllFact = async () => {
        setLoading(true);
        setError(null);
        try {
          const result = await getAllFacts();
          console.log("result: ", result)
          setAllFacts(result);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to fetch fact');
        } finally {
          setLoading(false);
        }
      };
    useEffect(() => {
       fetchAllFact();
      }, []);
  return (
    <div style={factsPageStyles}>
        <header style={appHeaderStyles}>
      <h1>Your Facts</h1>
      <div style={factsListStyles}>
        {!loading && allFacts.map((fact, index) => (
          <CartoonBrowserBox key={index} fact={fact} />
        ))}
      </div>
      </header>
    </div>
  );
};

export default FactsPage;