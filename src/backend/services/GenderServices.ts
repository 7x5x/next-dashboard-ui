// src/services/genderDataService.ts 

import GenderData, { IGenderData } from "../modules/Gender";

 

export class GenderServices {
  static createGenderData = async (data: IGenderData) => {
    const genderData = new GenderData(data);
    return await genderData.save();
  };

  static getAllGenderData = async () => {
    return await GenderData.find();
  };
  static getGenderDataById = async (id: string) => {
    return await GenderData.findById(id);
  };

  static updateGenderData = async (id: string, data: Partial<IGenderData>) => {
    return await GenderData.findByIdAndUpdate(id, data, { new: true });
  };

  static deleteGenderData = async (id: string) => {
    return await GenderData.findByIdAndDelete(id);
  };
}