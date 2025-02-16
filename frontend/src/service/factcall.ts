import Cookies from 'js-cookie';
import axios from 'axios';

export async function getFact(mode?: number): Promise<string> {
    const apiUrl = process.env.REACT_APP_FACT_API;
    const userID = Cookies.get('userID');
    if (!apiUrl) {
      throw new Error('FACT_API environment variable is not defined');
    }

    try {
      if (userID) {
        const body = {
          userId: userID,
          mode
        }
        const response = await axios({
          method: 'POST',
          url: apiUrl,
          data: body
        });
        const data = await response.data;
        return data.fact;
      } else {
        const body = {
          mode
        }
        const response = await axios({
          method: 'POST',
          url: apiUrl,
          data: body
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
    return await response.data.facts;
  } catch (error) {
    console.error('Error fetching all facts:', error);
    throw error;
  }
}

export async function deleteFactUser(factId: number) {
  const apiUrlDelete = process.env.REACT_APP_DELETE_FACT_API;
  const userID = Cookies.get('userID');

  if (!apiUrlDelete || !userID || !factId) {
    throw new Error('FACT_API environment variable is not defined');
  }

  try {
    const body = {
      factId: factId,
      userId: userID
    }
    const response = await axios({
      method: 'DELETE',
      url: apiUrlDelete,
      data:body
    });
    console.log("deleted fact");
    return await response.data
  } catch (error) {
    console.error('Error deleting fact from user:', error);
    throw error;
  }
}