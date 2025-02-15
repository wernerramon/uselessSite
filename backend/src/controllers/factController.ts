import { Request, Response } from 'express';
import axios from 'axios';
import { Fact } from '../models/factsModel';
import {createUser, updateUser} from "./userController";

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


export const saveFact = async (fact: string) => {
  try {
    // Create a new Fact document and save it to the DB
    const newFact = new Fact({ fact });
    const savedFact = await newFact.save();
    return savedFact;
  } catch (error) {
    console.error('Error creating fact:', error);
    return;
  }
};

/**
 * Controller to generate a fact from an internal AI.
 * GET /fact
 */
export const generateFact = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Generating fact...');
    const userId = req.body.userId;
    let user;
    if (!userId) {
      user = await createUser();
    }

    const response = await axios.post(externalURL, {
      model: 'mistral',
      prompt: prompt,
      stream: false,
    });
    console.log('External service response:', response.data);
    const fact = await saveFact(response.data.response);
    if (!fact) {
        res.status(500).json({ error: 'Error saving the fact' });
    }
    user = await updateUser(user.id, fact?.id);
    res.status(200).json({ fact: response.data.response, id: user.id });
  } catch (error) {
    console.error('Error fetching fact from external service:', error);
    res.status(500).json({ error: 'Error fetching the fact' });
  }
};
