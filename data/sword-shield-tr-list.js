import { readFileSync } from "fs";
import { getMoveByName } from "./sword-shield-move-info.js";

export const sword_shield_tr_list = readFileSync(
  "./data/raw/sword_shield_tr_list.txt",
  "utf-8"
)
  .split(/\r?\n/)
  .map(s => getMoveByName(s.replace(/^- \[TR\d+\] /, "")));
