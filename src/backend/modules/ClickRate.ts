// backend/models/ClickRate.ts
import mongoose, { Schema, Document } from "mongoose";

// Define the interface for ClickRate
export interface IClickRate  {
  clickRate: number;
  date: Date;
}

// Create the schema for ClickRate
const clickRateSchema = new Schema<IClickRate & Document>(
  {
    clickRate: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

// ClickRate Model
 
const ClickRate =
  mongoose.models.ClickRate ||
  mongoose.model<IClickRate>("ClickRate", clickRateSchema);

export default ClickRate;
