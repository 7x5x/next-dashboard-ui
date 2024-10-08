// src/pages/api/gender-data/index.ts
import { GenderController } from "@/backend/controllers/Gender";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      GenderController.createGenderData(req, res);
      break;
    case "GET":
      GenderController.getAllGenderData(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
