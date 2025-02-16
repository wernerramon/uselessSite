import { Request, Response } from 'express';
import axios from 'axios';
import { Fact } from '../models/factsModel';
import {createUser, getUser, updateUser} from "./userController";

// External service configuration
const externalHostIP = '127.0.0.1';
const externalURL = `http://${externalHostIP}:11434/api/generate`;

// Examples used for prompt generation
const examples0: string[] = [
  "The probability of toast landing butter-side down seems almost magical.",
  "Old clocks sometimes tick to their own beat.",
  "Coffee stains can accidentally resemble modern art.",
  "Raindrops occasionally perform a spontaneous concert.",
  "Some plants appear to grow in a secret, rhythmic pattern."
];

const examples1: string[] = [
  "A standard ballpoint pen contains about 0.5 milliliters of ink.",
  "Most cars have four tires, regardless of the make or model.",
  "A typical refrigerator maintains an interior temperature of around 4°C (39°F).",
  "A computer's boot-up time is usually under a minute.",
  "A standard keyboard generally has around 104 keys.",
];

const examples2: string[] = [
  "Sometimes trees whisper secrets when the wind blows in reverse.",
  "Invisible elephants are said to dance through the city streets at night.",
  "A cookie might recount the tales of forgotten tea parties.",
  "The shadows of clouds seem to compete for the sun's attention.",
  "If dreams had colors, even the rainbow might feel envious."
];

const examples3: string[] = [
  "1 + 1 = 2",
  "Water is wet.",
  "Fire burns.",
  "The sky is blue.",
  "The Earth orbits the sun.",
];




const generatePrompt = (mode: number): string => {
    switch (mode) {
        case 0:
        return "Give me a useless but true fact. Example: " +
            examples0[Math.floor(Math.random() * examples0.length)] +
            ". Now give me ONE other useless but true fact:";
        case 1:
        return "Generate a mildly useless but true fact. Example: " +
            examples1[Math.floor(Math.random() * examples1.length)] +
            ". Now generate ONE other mildly useless but true fact:";
        case 2:
        return "Give me a very useless but true fact. Example: " +
            examples2[Math.floor(Math.random() * examples2.length)] +
            ". Return ONE other very useless but true fact";
        case 3:
        return "Give me a very very very useless but true fact. Example: " +
            examples3[Math.floor(Math.random() * examples3.length)] +
            ".Now give me ONE other very very very useless but true fact:";
        default:
        return "Generate a useless but true fact. Example: " +
            examples0[Math.floor(Math.random() * examples0.length)] +
            ". Now generate ONE another useless but true fact:";
    }
}


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

const generateNewFact = async (user: any, mode: number, res: Response): Promise<void> => {

  const promtToUse = generatePrompt(mode);
  console.log('Prompt:', promtToUse);
  const externalResponse = await axios.post(externalURL, {
    model: 'mistral',
    prompt: promtToUse,
    stream: false,
  });
  console.log('External service response:', externalResponse.data);
  const newFact = await saveFact(externalResponse.data.response, mode);
  if (!newFact) {
    res.status(500).json({ error: 'Error saving the fact' });
    return;
  }
  const updatedUser = await updateUser(user.id, newFact.id);
  res.status(200).json({ fact: externalResponse.data.response, id: updatedUser.id });
};

export const generateFact = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Generating fact...');

    const userId: number = req.body.userId as number;
    let mode: number = req.body.mode as number;

    let user = userId ? await getUser(userId) : await createUser();

    if (mode === undefined || mode < 0 || mode > 3) {
      mode = 0;
    }

    const modeFacts = await getFactsFromMode(mode);

    if (!modeFacts || modeFacts.length === 0) {
      console.log(`No facts found for mode ${mode}. Generating new fact...`);
      await generateNewFact(user, mode, res);
      return;
    }

    // Randomly select a fact from the retrieved facts
    const randomFactIndex = Math.floor(Math.random() * modeFacts.length);
    const selectedFact = modeFacts[randomFactIndex];

    // If the user already has this fact, generate a new fact
    if (user.factIDs.includes(selectedFact.id)) {
      console.log('User already has fact with id:', selectedFact.id);
      await generateNewFact(user, mode, res);
    } else {
      console.log('User has not saved the fact with id:', selectedFact.id);
      const factFromDB = await getFact(selectedFact.id);
      console.log('Fact from DB:', factFromDB);
      console.log('User:', user);
      const updatedUser = await updateUser(user.id, factFromDB!.id);
      res.status(200).json({ fact: factFromDB!.fact, id: updatedUser.id });
    }
  } catch (error) {
    console.error('Error fetching fact from external service:', error);
    res.status(500).json({ error: 'Error fetching the fact' });
  }
};
