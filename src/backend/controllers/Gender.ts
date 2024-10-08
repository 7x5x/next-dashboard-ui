import { handleError } from "@/lib/errorHandler";
import { GenderServices } from "../services/GenderServices";

import type { NextApiRequest, NextApiResponse } from "next";

export class GenderController {
  static async createGenderData(req: NextApiRequest, res: NextApiResponse) {
    try {
      const newGenderData = await GenderServices.createGenderData(req.body);
      res.status(201).json(newGenderData);
    } catch (error) {
      handleError(res, error);
    }
  }

  static async getAllGenderData(req: NextApiRequest, res: NextApiResponse) {
    try {
      const genderData = await GenderServices.getAllGenderData();
      res.status(200).json(genderData);
    } catch (error) {
      handleError(res, error);
    }
  }
}


  