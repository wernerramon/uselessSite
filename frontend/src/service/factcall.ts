export async function getFact(): Promise<string> {
    const apiUrl = process.env.REACT_APP_FACT_API;
    
    console.log("api call: ", apiUrl);
    if (!apiUrl) {
      throw new Error('FACT_API environment variable is not defined');
    }
  
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        
        const fullFact = data.fact;
        const separatorIndex = fullFact.indexOf(':');
        
        return fullFact.slice(separatorIndex + 1).trim();
      } catch (error) {
        console.error('Error fetching fact:', error);
        throw error;
      }
  }