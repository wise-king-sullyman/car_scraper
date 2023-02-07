import { CarSearchParams } from "../searchParameters/carDataTypes";

const urlBase = "https://www.cars.com/shopping/results/?";

export function buildUrl(params: CarSearchParams) {
  const fullParams = Object.keys(params).reduce((acc, key) => {
    const value = params[key as keyof CarSearchParams];
    if (typeof value === "object") {
      const arrayValue = value.reduce(
        (valueAcc, valueFromArray) => `${valueAcc}&${key}[]=${valueFromArray}`,
        ""
      );
      return `${acc}&${key}=${arrayValue}`;
    } else {
      return `${acc}&${key}=${value}`;
    }
  }, "");
  return urlBase + fullParams.slice(1);
}
