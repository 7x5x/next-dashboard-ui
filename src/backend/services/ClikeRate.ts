// src/services/genderDataService.ts

import ClickRate, { IClickRate } from "../modules/ClickRate";

export class GenderServices {
  static createGenderData = async (data: IClickRate) => {
    const genderData = new ClickRate(data);
    return await genderData.save();
  };

  static getAllGenderData = async () => {
    return await ClickRate.find();
  };
  static getGenderDataById = async (id: string) => {
    return await ClickRate.findById(id);
  };

  static updateGenderData = async (id: string, data: Partial<IClickRate>) => {
    return await ClickRate.findByIdAndUpdate(id, data, { new: true });
  };

  static deleteGenderData = async (id: string) => {
    return await ClickRate.findByIdAndDelete(id);
  };
}
