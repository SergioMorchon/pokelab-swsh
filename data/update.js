import { writeFileSync, existsSync, mkdirSync } from "fs";
import { sep } from "path";
import { types } from "./types.js";
import { sword_shield_move_info } from "./sword-shield-move-info.js";
import { serialize as serializeTms } from "./sword-shield-tm-list.js";
import { serialize as serializeTrs } from "./sword-shield-tr-list.js";
import { sword_shield_ability_descriptions } from "./sword-shield-ability-descriptions.js";
import { serializeStats } from "./sword-shield-stats.js";
import eggGroups from "./egg-groups.js";
import experienceGroups from "./experience-groups.js";

const distPath = [process.cwd(), "dist"].join(sep);
const dataDistPath = [distPath, "data"].join(sep);

if (!existsSync(distPath)) {
  mkdirSync(distPath);
}

if (!existsSync(dataDistPath)) {
  mkdirSync(dataDistPath);
}

const writeJson = (fileName, data) =>
  writeFileSync(
    `${dataDistPath}${sep}${fileName}.json`,
    JSON.stringify(data, null, "\t")
  );
const writeBinary = (fileName, data) =>
  writeFileSync(`${dataDistPath}${sep}${fileName}`, data);

writeJson("types", types);
writeJson("sword-shield-move-info", sword_shield_move_info);
writeBinary("sword-shield-tm-list", serializeTms());
writeBinary("sword-shield-tr-list", serializeTrs());
writeJson(
  "sword_shield_ability_descriptions",
  sword_shield_ability_descriptions
);
writeJson("egg-groups", eggGroups);
writeJson("experience-groups", experienceGroups);
writeBinary("sword_shield_stats", serializeStats());
