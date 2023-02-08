import express from "express";
import path from "path";
import process from "process";
import { readdirSync } from "fs";

const app = express();
const port = process.env.PORT || 3000;

function getReportIndex(make: string) {
  return readdirSync(path.join(process.cwd(), `data/${make}`));
}

function getReport({ make, reportId }: { make: string, reportId: string}) {
  const reportName = getReportIndex(make)[parseInt(reportId)]
  return path.join(process.cwd(), `data/${make}/${reportName}`);
}

app.get("/", (_req, res) => {
  res.send('hello world');
});

app.get("/:make", (req, res) => {
  res.send(getReportIndex(req.params.make));
});

app.get("/:make/:reportId", (req, res) => {
  res.sendFile(getReport(req.params));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});