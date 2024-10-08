// src/pages/api/line-items/index.ts
import type { NextApiRequest, NextApiResponse } from "next"; 
import { handleError } from "@/lib/errorHandler";
import lineItemService from "@/backend/services/lineItemService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        const newLineItem = await lineItemService.createLineItem(req.body);
        res.status(201).json(newLineItem);
      } catch (error) {
       handleError(res, error); 
      }
      break;
    case "GET":
      try {
        const lineItems = await lineItemService.getAllLineItems();
        res.status(200).json(lineItems);
      } catch (error) {
       handleError(res, error); 
      }
      break;
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
