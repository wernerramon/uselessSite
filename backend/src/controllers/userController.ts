import {IUser, User} from '../models/userModel';


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
