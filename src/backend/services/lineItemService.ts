// src/services/lineItemService.ts
import PaidImpressions, {
  IPaidImpressions,
} from "@/backend/modules/PaidImpressions";

class PaidImpressionsService {
  // Create a new line item
  static async createLineItem(data: IPaidImpressions) {
    try {
      // Ensure the date is in the correct format
      const newLineItem: IPaidImpressions = {
        ...data,
        date: data.date ? new Date(data.date) : new Date(),
      };

      // Log the newLineItem for debugging
      console.log("Creating new line item:", newLineItem);

      const lineItem = new PaidImpressions(newLineItem);
      const savedLineItem = await lineItem.save(); // Save and await the result
      return savedLineItem; // Return the saved item if needed
    } catch (error) {
      console.error("Error creating line item:", error);
      throw new Error("Failed to create line item"); // Rethrow the error for further handling
    }
  }

  // Get all line items
  static async getAllLineItems() {
    return await PaidImpressions.find();
  }

  // Get a line item by ID
  static async getLineItemById(id: string) {
    return await PaidImpressions.findById(id);
  }

  // Update a line item
  static async updateLineItem(id: string, data: Partial<IPaidImpressions>) {
    return await PaidImpressions.findByIdAndUpdate(id, data, { new: true });
  }

  // Delete a line item
  static async deleteLineItem(id: string) {
    return await PaidImpressions.findByIdAndDelete(id);
  }
}

export default PaidImpressionsService;
