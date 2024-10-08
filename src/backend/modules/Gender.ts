// backend/models/GenderData.ts
import mongoose, { Schema, Document } from "mongoose";

// Define the interface for GenderData
export interface IGenderData  {
  male: number;
  female: number;
  date: Date;
}

// Create the schema for GenderData
const genderDataSchema = new Schema<IGenderData & Document>(
  {
    male: { type: Number, required: true },
    female: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

// GenderData Model
const GenderData = mongoose.model<IGenderData & Document>(
  "GenderData",
  genderDataSchema
);
export default GenderData;
