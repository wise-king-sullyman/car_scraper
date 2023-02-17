import { CarSearchParams } from "./carDataTypes";

export const model3: CarSearchParams = {
  dealer_id: "",
  keyword: "",
  list_price_max: "",
  list_price_min: "",
  makes: ["tesla"],
  maximum_distance: "all",
  mileage_max: 50000,
  models: ["tesla-model_3"],
  page_size: 200,
  sort: "list_price",
  stock_type: "all",
  trims: ["tesla-model_3-performance"],
  year_max: 2020,
  year_min: "",
  zip: 27599,
};

export const modelS: CarSearchParams = {
  dealer_id: "",
  keyword: "",
  list_price_max: "",
  list_price_min: "",
  makes: ["tesla"],
  maximum_distance: "all",
  mileage_max: 50000,
  models: ["tesla-model_s"],
  page_size: 200,
  sort: "list_price",
  stock_type: "all",
  trims: ["tesla-model_s-p100d", "tesla-model_s-performance"],
  year_max: 2021,
  year_min: 2018,
  zip: 27599,
}