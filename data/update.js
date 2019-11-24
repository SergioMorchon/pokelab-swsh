import { writeFileSync, existsSync, mkdirSync } from "fs";
import { sword_shield_stats } from "./sword-shield-stats.js";
import { sep } from "path";

const jsonPath = [process.cwd(), "data", "json"].join(sep) + sep;

if (!existsSync(jsonPath)) {
  mkdirSync(jsonPath);
}

writeFileSync(
  `${jsonPath}sword_shield_stats.json`,
  JSON.stringify(sword_shield_stats, null, "\t")
);
