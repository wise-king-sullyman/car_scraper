import get from "axios";
import { parse } from "node-html-parser";
import { CarData } from "../searchParameters";

function extractDetailedInfo(detail: HTMLElement): CarData {
  function getByQuerySelector(selector: string) {
    const node = detail.querySelector<HTMLElement>(selector);

    switch (selector) {
      case ".mileage":
        return node?.textContent?.split(" ")[0].replace(",", "");
      case ".miles-from":
        return node?.textContent?.split(" ")[6].replace(",", "");
      case ".vehicle-card-link":
        return "https://cars.com" + (node as any)?.attrs.href;
      case ".primary-price":
        if (node?.textContent?.includes("$")) {
          return node?.textContent?.slice(1).replace(",", "");
        }
        break;
      default:
        return node?.textContent;
    }
  }

  const title = getByQuerySelector(".title") || undefined;
  const type = getByQuerySelector(".stock-type") || undefined;
  const mileage = getByQuerySelector(".mileage") || undefined;
  const price = getByQuerySelector(".primary-price") || undefined;
  const distance = getByQuerySelector(".miles-from") || undefined;
  const link = getByQuerySelector(".vehicle-card-link") || undefined;

  return { title, type, mileage, price, distance, link };
}

export async function fetchData(url: string) {
  const data = await get(url).then((res) => res.data);

  const root = parse(data);

  const details = root.querySelectorAll(".vehicle-details");

  const aggregated_info = details.map((detail) =>
    extractDetailedInfo(detail as unknown as HTMLElement)
  );

  return aggregated_info;
}
