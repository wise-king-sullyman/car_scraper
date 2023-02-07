import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";
import process from "process";

import { buildUrl, fetchData } from "./";
import { cars, CarData, CarSearchParamsCollection } from "../searchParameters";

function writeReport(data: CarData[], carName: string) {
  const dateTime = new Date().toLocaleString();
  const formattedDateTime = dateTime
    .replaceAll("/", "-")
    .replaceAll(",", "_")
    .replaceAll(" ", "");
  const outputPathBase = path.join(process.cwd(), "data", carName);

  if (!existsSync(outputPathBase)) {
    mkdirSync(outputPathBase);
  }

  writeFileSync(
    path.join(outputPathBase, `${formattedDateTime}.json`),
    JSON.stringify(data)
  );

  console.log(`report written for ${carName}`);
}

export async function generateReports(
  carParameters: CarSearchParamsCollection
) {
  Object.keys(carParameters).forEach((make) => {
    const url = buildUrl(
      carParameters[make as keyof CarSearchParamsCollection]
    );
    fetchData(url).then((data) => writeReport(data, make));
  });
}

generateReports(cars);
