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
          method: 'POST',
          url: apiUrl,
          data:body
        });
        const data = await response.data;
        return data.fact;
      } else {
        const response = await axios({
          method: 'POST',
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
  const apiUrlALL = process.env.REACT_APP_ALL_FACT_API;
  const userID = Cookies.get('userID');
  if (!apiUrlALL || !userID) {
    console.log("error api url or userID")
    throw new Error('FACT_API environment variable is not defined');
  }

  try {
    const body = {
      userId: userID
    }
    const response = await axios({
      method: 'POST',
      url: apiUrlALL,
      data:body
    });
    const data: string[] = await response.data.facts;
    return data.filter((_, index) => index % 2 === 0);
  } catch (error) {
    console.error('Error fetching all fact:', error);
    throw error;
  }
}