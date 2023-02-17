import { s60 } from "./volvo";
import { model3, modelS } from "./tesla";
import { CarSearchParamsCollection } from "./carDataTypes";

export const cars: CarSearchParamsCollection = {
  s60,
  model3,
  modelS,
};
export * from "./carDataTypes";
