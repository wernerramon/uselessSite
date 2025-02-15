import { Request, Response } from 'express';
import axios from 'axios';
import { Fact } from '../models/factsModel';
import {createUser, getUser, updateUser} from "./userController";

// External service configuration
const externalHostIP = '127.0.0.1';
const externalURL = `http://${externalHostIP}:11434/api/generate`;

// Examples used for prompt generation
const examples: string[] = [
  "A shrimp's heart is located in its head",
  "Bananas are berries, but strawberries are not",
  "Wombat poop is cube-shaped",
  "A day on Venus is longer than a year on Venus",
  "The inventor of the frisbee was turned into a frisbee after he died",
];

// Generate a prompt using one random example
const prompt: string =
    "Generate a useless but true fact. Example: " +
    examples[Math.floor(Math.random() * examples.length)] +
    ". Now generate ONE another useless but true fact:";


export const saveFact = async (fact: string, mode: number) => {
  try {
    // Create a new Fact document and save it to the DB
    const newFact = new Fact({ fact, mode });
    const savedFact = await newFact.save();
    return savedFact;
  } catch (error) {
    console.error('Error creating fact:', error);
    return;
  }
};

export const getFact = async (factId: number) => {
    try {
        const fact = await Fact.findOne({ id: factId });
        return fact;
    } catch (error) {
        console.error('Error fetching fact:', error);
        return;
    }
}

export const getFactsFromMode = async (mode: number) => {
    try {
        const facts = await Fact.find({ mode: mode });
        return facts;
    } catch (error) {
        console.error('Error fetching facts:', error);
        return;
    }
}

export const getMaxFactId = async () => {
    try {
        const maxFact = await Fact.findOne().sort({ id: -1 });
        if (!maxFact) {
            return 0;
        }
        return maxFact.id;
    } catch (error) {
        console.error('Error fetching max fact id:', error);
        return;
    }
}

export const generateFact = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Generating fact...');
    const userId = req.body.userId;
    let mode = req.body.mode;
    let user;

    if (!userId) {
      user = await createUser();
    } else {
      user = await getUser(userId);
    }

    if (mode < 0 || mode > 3 || mode === undefined) {
      mode = 0;
    }

    let modeFacts = await getFactsFromMode(mode);

    if (!modeFacts || modeFacts.length === 0) {
      console.log(`No facts found for mode ${mode}. Generating new fact...`);
      const response = await axios.post(externalURL, {
        model: 'mistral',
        prompt: prompt,
        stream: false,
      });
      console.log('External service response:', response.data);
      const fact = await saveFact(response.data.response, mode);
      if (!fact) {
        res.status(500).json({ error: 'Error saving the fact' });
        return;
      }
      user = await updateUser(user.id, fact?.id);
      res.status(200).json({ fact: response.data.response, id: user.id });
      return;
    }

    const randomFactIndex = Math.floor(Math.random() * modeFacts.length);
    const selectedFact = modeFacts[randomFactIndex];

    if (user.factIDs.includes(selectedFact.id)) {
      console.log('User already has fact with id:', selectedFact.id);
      const response = await axios.post(externalURL, {
        model: 'mistral',
        prompt: prompt,
        stream: false,
      });
      console.log('External service response:', response.data);
      const fact = await saveFact(response.data.response, mode);
      if (!fact) {
        res.status(500).json({ error: 'Error saving the fact' });
        return;
      }
      user = await updateUser(user.id, fact?.id);
      res.status(200).json({ fact: response.data.response, id: user.id });
    } else {
      console.log('User has not saved the fact with id:', selectedFact.id);
      const fact = await getFact(selectedFact.id);
      console.log('Fact from DB:', fact);
      console.log('User:', user);
      user = await updateUser(user.id, fact!.id);
      res.status(200).json({ fact: fact!.fact, id: user.id });
    }
  } catch (error) {
    console.error('Error fetching fact from external service:', error);
    res.status(500).json({ error: 'Error fetching the fact' });
  }
};