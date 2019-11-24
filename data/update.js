import { writeFileSync } from "fs";
import { sword_shield_stats } from "./sword-shield-stats.js";

writeFileSync(
  "./data/sword_shield_stats.json",
  JSON.stringify(sword_shield_stats, null, "\t")
);
