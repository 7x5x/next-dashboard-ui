// src/pages/api/line-items/[id].ts
import type { NextApiRequest, NextApiResponse } from "next"; 
import { handleError } from "@/lib/errorHandler";
import lineItemService from "@/backend/services/lineItemService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const lineItem = await lineItemService.getLineItemById(id as string);
        if (!lineItem)
          return res.status(404).json({ message: "Line item not found" });
        res.json(lineItem);
      } catch (error) {
          handleError(res,error); 
      }
      break;
    case "PUT":
      try {
        const updatedLineItem = await lineItemService.updateLineItem(
          id as string,
          req.body
        );
        if (!updatedLineItem)
          return res.status(404).json({ message: "Line item not found" });
        res.json(updatedLineItem);
      } catch (error) {
       handleError(res, error); 
      }
      break;
    case "DELETE":
      try {
        const deletedLineItem = await lineItemService.deleteLineItem(
          id as string
        );
        if (!deletedLineItem)
          return res.status(404).json({ message: "Line item not found" });
        res.json({ message: "Line item deleted" });
      } catch (error) {
       handleError(res, error); 
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
