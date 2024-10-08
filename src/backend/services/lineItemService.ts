// src/services/lineItemService.ts
import LineItem, { ILineItem } from "@/backend/modules/PaidImpressions";

class LineItemService {
  // Create a new line item
  static async createLineItem(data: ILineItem) {
    const lineItem = new LineItem(data);
    return await lineItem.save();
  }

  // Get all line items
  static async getAllLineItems() {
    return await LineItem.find();
  }

  // Get a line item by ID
  static async getLineItemById(id: string) {
    return await LineItem.findById(id);
  }

  // Update a line item
  static async updateLineItem(id: string, data: Partial<ILineItem>) {
    return await LineItem.findByIdAndUpdate(id, data, { new: true });
  }

  // Delete a line item
  static async deleteLineItem(id: string) {
    return await LineItem.findByIdAndDelete(id);
  }
}

export default LineItemService;
