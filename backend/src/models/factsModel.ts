import mongoose, { Document, Schema } from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose);

/**
 * IFact interface extends Mongoose Document for type safety.
 * - `fact`: the fact string.
 * - `createdAt`: automatically set via timestamps.
 * - `id`: auto-incremented numeric id.
 */
export interface IFact extends Document {
  fact: string;
  createdAt: Date;
  id: number;
}

const FactSchema: Schema<IFact> = new Schema(
    {
      fact: { type: String, required: true },
    },
    {
      timestamps: true,
    }
);

FactSchema.plugin(AutoIncrement, { inc_field: 'id', id: 'fact_seq' });

export const Fact = mongoose.model<IFact>('Fact', FactSchema);
