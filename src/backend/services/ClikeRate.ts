// src/services/genderDataService.ts

import ClickRate, { IClickRate } from "../modules/ClickRate";

export class ClikeRateServices {
  static createClikeData = async (data: IClickRate) => {

     const newData: IClickRate = {
       ...data,
       date: data.date ? new Date(data.date) : new Date(),
     };
    const genderData = new ClickRate(newData);
    return await genderData.save();
  };

  static getAllClikeData = async () => {
    return await ClickRate.find();
  };
  getAllClikeData = async () => {
    return await ClickRate.find();
  };
  static getClikeDataById = async (id: string) => {
    return await ClickRate.findById(id);
  };

  static updateClikeData = async (id: string, data: Partial<IClickRate>) => {
    return await ClickRate.findByIdAndUpdate(id, data, { new: true });
  };

  static deleteClikeData = async (id: string) => {
    return await ClickRate.findByIdAndDelete(id);
  };
}
