import { writeFileSync, existsSync, mkdirSync } from "fs";
import { sep } from "path";
import { types } from "./types.js";
import { sword_shield_move_info } from "./sword-shield-move-info.js";
import { serialize as serializeTms } from "./sword-shield-tm-list.js";
import { serialize as serializeTrs } from "./sword-shield-tr-list.js";
import { sword_shield_ability_descriptions } from "./sword-shield-ability-descriptions.js";
import sword_shield_stats from "./sword-shield-stats.js";

const jsonPath = [process.cwd(), "data", "json"].join(sep) + sep;

if (!existsSync(jsonPath)) {
  mkdirSync(jsonPath);
}

writeFileSync(`${jsonPath}types.json`, JSON.stringify(types, null, "\t"));
writeFileSync(
  `${jsonPath}sword-shield-move-info.json`,
  JSON.stringify(sword_shield_move_info, null, "\t")
);
writeFileSync(`${jsonPath}sword-shield-tm-list`, serializeTms());
writeFileSync(`${jsonPath}sword-shield-tr-list`, serializeTrs());
writeFileSync(
  `${jsonPath}sword_shield_ability_descriptions.json`,
  JSON.stringify(sword_shield_ability_descriptions, null, "\t")
);
writeFileSync(
  `${jsonPath}sword_shield_stats.json`,
  JSON.stringify(sword_shield_stats, null, "\t")
);
