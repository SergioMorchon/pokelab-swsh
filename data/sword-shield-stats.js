import { readFileSync } from "fs";
/**
 * @param {string[]} lines
 */
function* properties(lines) {
  const [header, galarDex, baseStats, evYield, abilities, type] = lines;
  lines = lines.slice(6);
  const [nationalId, name] = header.split(" - ");
  yield { nationalId: Number(nationalId) };
  yield { name: name.split(/ \(Stage: \d+\)/)[0] };
  yield {
    galarDex:
      galarDex === "Galar Dex: Foreign"
        ? null
        : Number(galarDex.replace("Galar Dex: #", ""))
  };
  yield {
    baseStats: baseStats
      .replace("Base Stats: ", "")
      .replace(/ \(BST: \d+\)/, "")
      .split(".")
      .slice(0, 6)
      .map(Number)
  };
  yield {
    evYield: evYield
      .replace("EV Yield: ", "")
      .split(".")
      .map(Number)
  };
  yield {
    abilities: abilities
      .replace("Abilities: ", "")
      .split(" | ")
      .reduce((acc, s) => {
        const match = /(.*) \((.)\)/.exec(s);
        acc[match[2]] = match[1];
        return acc;
      }, {})
  };
  yield { type: type.replace("Type: ", "").split(" / ") };
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
  yield items;
  const [expGroup, eggGroup, hatchCycles] = lines;
  lines = lines.slice(4);
  yield { expGroup: expGroup.replace("EXP Group: ", "") };
  yield { eggGroup: eggGroup.replace("Egg Group: ", "").split(" / ") };
  yield { hatchCycles: Number(hatchCycles.replace("Hatch Cycles: ", "")) };

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
      levelUpMoves.push([Number(level), name]);
    }

    lines = lines.slice(i);
  }

  yield { levelUpMoves };

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
      eggMoves.push(name);
    }

    lines = lines.slice(i);
  }

  yield { eggMoves };

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

  yield { tms };

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

  yield { trs };
}

const compose = raw =>
  Array.from(properties(raw)).reduce((acc, prop) => ({ ...acc, ...prop }), {});

export const sword_shield_stats = readFileSync(
  "./data/raw/sword_shield_stats.txt",
  "utf-8"
)
  .split("======")
  .filter(Boolean)
  .map(s => compose(s.trim().split(/\r?\n/)));
