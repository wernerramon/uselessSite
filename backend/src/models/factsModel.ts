import mongoose, { Document, Schema } from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose);

/**
 * IFact interface extends Mongoose Document for type safety.
 * - `fact`: the fact string.
 * - `mode`: the mode of the fact.
 * - `createdAt`: automatically set via timestamps.
 * - `id`: auto-incremented numeric id.
 */
export interface IFact extends Document {
  fact: string;
  mode: number;
  createdAt: Date;
  id: number;
}

const FactSchema: Schema<IFact> = new Schema(
    {
      fact: { type: String, required: true },
      mode: { type: Number, required: true, default: 0 },
    },
    {
      timestamps: true,
    }
);

FactSchema.plugin(AutoIncrement, { inc_field: 'id', id: 'fact_seq' });

export const Fact = mongoose.model<IFact>('Fact', FactSchema);
