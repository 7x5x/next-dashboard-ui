import mongoose, { Schema, Document } from "mongoose";

// Define the interface for Interest data
export interface IInterest {
  name: string;
  value: number;
}

// Create the schema for Interest data
const InterestDataSchema = new Schema<IInterest & Document>(
  {
    name: { type: String, required: true },
    value: { type: Number, required: true },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Prevent model overwrite by checking if it exists
const InterestData =
  mongoose.models.InterestData ||
  mongoose.model<IInterest & Document>("InterestData", InterestDataSchema);

export default InterestData;
