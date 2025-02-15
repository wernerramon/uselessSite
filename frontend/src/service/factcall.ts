import Cookies from 'js-cookie';
import axios from 'axios';

export async function getFact(): Promise<string> {
    const apiUrl = process.env.REACT_APP_FACT_API;
    const userID = Cookies.get('userID');
    
    if (!apiUrl) {
      throw new Error('FACT_API environment variable is not defined');
    }
  
    try {
      if (userID) {
        const body = {
          userId: userID
        }
        const response = await axios({
          method: 'GET',
          url: apiUrl,
          data: JSON.stringify(body)
        });
        
        const data = await response.data;
        Cookies.set('userID', data.id, { expires: 7 });
        return data.fact;
      } else {
        const response = await axios({
          method: 'GET',
          url: apiUrl,
        });
        
        const data = await response.data;
        Cookies.set('userID', data.id, { expires: 7 });
        return data.fact;
      }
      } catch (error) {
        console.error('Error fetching fact:', error);
        throw error;
      }
  }

export async function getAllFacts(): Promise<string[]> {
  const apiUrl = process.env.REACT_APP_ALL_FACT_API;
  const userID = Cookies.get('userID');
  console.log("userId all facts: ", userID);
  if (!apiUrl || !userID) {
    console.log("error api url or userID")
    throw new Error('FACT_API environment variable is not defined');
  }

  try {
    const body = {
      userId: userID
    }
    console.log("body: ", body)
    const response = await axios({
      method: 'GET',
      url: apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(body)
    });
    const data = await response.data;
    console.log("facts: ", data.fact);
    return data.fact;
  } catch (error) {
    console.error('Error fetching all fact:', error);
    throw error;
  }
}