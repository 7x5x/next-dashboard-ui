// backend/models/LineItem.ts
import mongoose, { Schema, Document } from "mongoose";

// Define the interface for LineItem
export interface IPaidImpressions {
  firstLine: number;
  secondLine: number;
  date: Date;
}

// Create the schema for LineItem
const lineItemSchema = new Schema<IPaidImpressions & Document>(
  {
    firstLine: { type: Number, required: true },
    secondLine: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

// LineItem Model
 
const IPaidImpressionsData =
  mongoose.models.IPaidImpressionsData ||
  mongoose.model<IPaidImpressions & Document>(
    "IPaidImpressionsData",
    lineItemSchema
  );

export default IPaidImpressionsData;
