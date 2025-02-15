import {IUser, User} from '../models/userModel';
import {Request, Response} from "express";
import {getFact} from "./factController";


export const createUser = async (): Promise<any> => {
  try {
    const newUser = new User();
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    console.error('Error creating user:', error);
    return;
  }
};

/**
 * Updates an existing user by adding a new fact ID.
 *
 * Request Body should include:
 *  - userId: number
 *  - factId: number
 *
 */
export const updateUser = async (userId: number, factId: number): Promise<any> => {
  try {
    const updatedUser = await User.findOneAndUpdate(
        { id: userId }, // search by the auto-incremented user id
        { $push: { factIDs: factId } },
        { new: true }
    );

    if (!updatedUser) {
      return;
    }
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    return;
  }
};

export const getUser = async (userId: number): Promise<any> => {
    try {
        const user = await User.findOne({ id: userId });
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        return;
    }
}

export const getAllFactsUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.body.userId;
        let user;
        if (!userId) {
            user = await createUser();
        } else {
            user = await getUser(userId);
        }
        const facts= [];
        for (let i = 0; i < user.factIDs.length; i++) {
            const fact = await getFact(user.factIDs[i]);
            if (!fact){
              continue;
            }
            facts.push(fact.fact, fact.mode);
        }
        res.status(200).json({facts: facts, id: user.id});
    } catch (error) {
        console.error('Error fetching all facts for user:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}