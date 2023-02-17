import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";
import process from "process";

import { buildUrl, fetchData } from "./";
import { cars, CarData, CarSearchParamsCollection } from "../searchParameters";

function writeReport(data: CarData[], make: string, model: string) {
  const dateTime = new Date().toLocaleString();
  const formattedDateTime = dateTime
    .replaceAll("/", "-")
    .replaceAll(",", "_")
    .replaceAll(" ", "");
  const outputPathBase = path.join(process.cwd(), "data", make, model);

  if (!existsSync(outputPathBase)) {
    mkdirSync(outputPathBase);
  }

  writeFileSync(
    path.join(outputPathBase, `${formattedDateTime}.json`),
    JSON.stringify(data)
  );

  console.log(`report written for ${make} ${model}`);
}

export async function generateReports(
  carParameters: CarSearchParamsCollection
) {
  Object.keys(carParameters).forEach((model) => {
    const searchParams =
      carParameters[model as keyof CarSearchParamsCollection];
    const make = searchParams.makes[0];
    const url = buildUrl(searchParams);
    fetchData(url).then((data) => writeReport(data, make, model));
  });
}

generateReports(cars);
