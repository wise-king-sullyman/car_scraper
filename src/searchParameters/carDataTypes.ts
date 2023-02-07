export interface CarData {
  title?: string;
  type?: string;
  mileage?: string;
  price?: string;
  distance?: string;
  link?: string;
}

export interface CarSearchParams {
  dealer_id: string;
  keyword: string;
  list_price_max: number | "";
  list_price_min: number | "";
  makes: string[];
  maximum_distance: number | "" | "all";
  mileage_max: number | "";
  models: string[];
  page_size: number;
  sort: string;
  stock_type: string;
  trims: string[];
  year_max: number | "";
  year_min: number | "";
  zip: number;
}

export type Make = "tesla" | "volvo";

export type CarSearchParamsCollection = {
  [make in Make]: CarSearchParams;
};