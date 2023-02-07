import { CarData } from "../searchParameters"

export function getReportId(report: CarData[]) {
  let mileageSum = 0
  let priceSum = 0
  let distanceSum = 0

  report.forEach(car => {
    mileageSum += parseInt(car?.mileage || '');
    priceSum += parseInt(car?.price || '');
    distanceSum += parseInt(car?.distance || '');
  })

  return mileageSum + priceSum + distanceSum
}

export function getUsedCars(report: CarData[]) {
  return report.filter(car => car.type === 'Used')
}

export function sanitizeReport(report: CarData[]) {
  return report.filter(car => car.price && car.mileage && car.distance)
}

export function sortReportsByLength(oldReport: CarData[], newReport: CarData[]) {
  const largerReport =
  oldReport.length > newReport.length ? oldReport : newReport;

  const smallerReport = getReportId(oldReport) === getReportId(largerReport) ? newReport : oldReport;

  return [smallerReport, largerReport]
}

export function isSameCar(carOne: CarData, carTwo: CarData) {
  return (
    carOne.mileage === carTwo.mileage &&
    carOne.link === carTwo.link &&
    carOne.distance === carTwo.distance
  );
}

export function carIsInReport(car: CarData, report: CarData[]) {
  return report.some((reportCar) =>
  isSameCar(reportCar, car)
);
}

export function carsNotInBoth(smallerReport: CarData[], largerReport: CarData[]) {
  return largerReport.filter((largerReportCar) => {
    return !carIsInReport(largerReportCar, smallerReport)
  });
}