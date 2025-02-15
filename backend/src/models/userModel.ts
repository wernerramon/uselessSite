import mongoose, { Document, Schema } from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose);

/**
 * IUser interface extends Mongoose Document for type safety.
 * - factIDs: an array of fact IDs (number) associated with the user.
 * - createdAt: automatically set via timestamps.
 * - id: auto-incremented numeric identifier.
 */
export interface IUser extends Document {
  factIDs: number[];
  createdAt: Date;
  id: number;
}

const UserSchema: Schema<IUser> = new Schema(
    {
      factIDs: { type: [Number], default: [] },
    },
    {
      timestamps: true,
    }
);

UserSchema.plugin(AutoIncrement, { inc_field: 'id', id: 'user_seq' });

export const User = mongoose.model<IUser>('User', UserSchema);
