// src/services/genderDataService.ts

import InterestData, { IInterest} from "../modules/Interest";

export class InterestServices {
  static createInterestData = async (data: IInterest) => {
    const genderData = new InterestData(data);
    return await genderData.save();
  };

  static getAllInterestData = async () => {
    return await InterestData.find();
  };
  static getInterestDataById = async (id: string) => {
    return await InterestData.findById(id);
  };

  static updateInterestData = async (id: string, data: Partial<IInterest>) => {
    return await InterestData.findByIdAndUpdate(id, data, { new: true });
  };

  static deleteInterestData = async (id: string) => {
    return await InterestData.findByIdAndDelete(id);
  };
}
