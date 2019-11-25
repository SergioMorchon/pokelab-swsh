import { readFileSync } from "fs";
import { getMoveByName } from "./sword-shield-move-info.js";
import { getAbilityByName } from "./sword-shield-ability-descriptions.js";
import { getTypeByName } from "./types.js";

const stats = readFileSync("./data/raw/sword_shield_stats.txt", "utf-8")
  .split("======")
  .filter(Boolean)
  .map(s => {
    let lines = s.trim().split(/\r?\n/);
    const pkm = {};
    const [header, galarDex, baseStats, evYield, abilities, type] = lines;
    lines = lines.slice(6);
    const [nationalId, name] = header.split(" - ");
    pkm.nationalId = Number(nationalId);
    pkm.name = name.split(/ \(Stage: \d+\)/)[0];
    pkm.galarDex =
      galarDex === "Galar Dex: Foreign"
        ? null
        : Number(galarDex.replace("Galar Dex: #", ""));
    pkm.baseStats = baseStats
      .replace("Base Stats: ", "")
      .replace(/ \(BST: \d+\)/, "")
      .split(".")
      .slice(0, 6)
      .map(Number);
    pkm.evYield = evYield
      .replace("EV Yield: ", "")
      .split(".")
      .map(Number);
    pkm.abilities = abilities
      .replace("Abilities: ", "")
      .split(" | ")
      .reduce((acc, s) => {
        const match = /(.*) \((.)\)/.exec(s);
        acc[match[2]] = getAbilityByName(match[1]);
        return acc;
      }, {});
    pkm.type = type
      .replace("Type: ", "")
      .split(" / ")
      .map(getTypeByName);
    const items = {
      items: lines
        .filter(s => s.startsWith("Item "))
        .reduce((acc, s) => {
          const [, percentage, name] = /Item \d \((\d+)%\): (.*)/.exec(s);
          if (name !== "None") {
            acc[name] = (name in acc ? acc[name] : 0) + percentage / 100;
          }

          return acc;
        }, {})
    };
    lines = lines.slice(Object.keys(items.items).length ? 3 : 1);
    pkm.items = items;
    const [expGroup, eggGroup, hatchCycles] = lines;
    lines = lines.slice(4);
    pkm.expGroup = expGroup.replace("EXP Group: ", "");
    pkm.eggGroup = eggGroup.replace("Egg Group: ", "").split(" / ");
    pkm.hatchCycles = Number(hatchCycles.replace("Hatch Cycles: ", ""));

    const levelUpMoves = [];
    if (lines[0] === "Level Up Moves:") {
      lines = lines.slice(1);
      let i = 0;
      for (; i < lines.length; i++) {
        const m = /- \[(\d+)\] (.*)/.exec(lines[i]);
        if (!m) {
          break;
        }

        const [, level, name] = m;
        levelUpMoves.push([Number(level), getMoveByName(name)]);
      }

      lines = lines.slice(i);
    }

    pkm.levelUpMoves = levelUpMoves;

    const eggMoves = [];
    if (lines[0] === "Egg Moves:") {
      lines = lines.slice(1);
      let i = 0;
      for (; i < lines.length; i++) {
        const m = /- (.*)/.exec(lines[i]);
        if (!m) {
          break;
        }

        const [, name] = m;
        eggMoves.push(getMoveByName(name));
      }

      lines = lines.slice(i);
    }

    pkm.eggMoves = eggMoves;

    const tms = [];
    if (lines[0] === "TMs:") {
      lines = lines.slice(1);
      let i = 0;
      for (; i < lines.length; i++) {
        const m = /- \[TM(\d+)\] (.*)/.exec(lines[i]);
        if (!m) {
          break;
        }

        const [, number] = m;
        tms.push(Number(number));
      }

      lines = lines.slice(i);
    }

    pkm.tms = tms;

    const trs = [];
    if (lines[0] === "TRs:") {
      lines = lines.slice(1);
      let i = 0;
      for (; i < lines.length; i++) {
        const m = /- \[TR(\d+)\] (.*)/.exec(lines[i]);
        if (!m) {
          break;
        }

        const [, number] = m;
        trs.push(Number(number));
      }

      lines = lines.slice(i);
    }

    pkm.trs = trs;

    return pkm;
  });

export default stats;
