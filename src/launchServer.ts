import express from "express";
import cors from "cors";
import path from "path";
import process from "process";
import { readdirSync } from "fs";

const app = express();
// TODO: Add conditional cors settings for dev and prod
app.use(cors({ origin: "*" }));
const port = process.env.PORT || 3001;

function getMakes() {
  return readdirSync(path.join(process.cwd(), "data"));
}

function getModels({ make }: { make: string }) {
  return readdirSync(path.join(process.cwd(), 'data', make));
}

function getReportIndex({ make, model }: { make: string; model: string }) {
  return readdirSync(path.join(process.cwd(), "data", make, model));
}

function getReport({
  make,
  model,
  reportId,
}: {
  make: string;
  model: string;
  reportId: string;
}) {
  const reportName = getReportIndex({ make, model })[parseInt(reportId)];
  return path.join(process.cwd(), "data", make, model, reportName);
}

app.get("/", (_req, res) => {
  res.send(getMakes());
});

app.get("/:make", (req, res) => {
  res.send(getModels(req.params));
});

app.get("/:make/:model", (req, res) => {
  res.send(getReportIndex(req.params));
});

app.get("/:make/:model/:reportId", (req, res) => {
  res.sendFile(getReport(req.params));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
