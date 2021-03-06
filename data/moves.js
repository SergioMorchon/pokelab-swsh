import { readFileSync } from 'fs';

const moves = readFileSync('./data/raw/sword_shield_move_info.txt', 'utf-8')
	.split(/\r?\n/)
	.slice(1)
	.reduce((acc, s) => {
		const [
			,
			name,
			version,
			id,
			canUseMove,
			type,
			quality,
			category,
			power,
			accuracy,
			PP,
			priority,
			hitMin,
			hitMax,
			inflict,
			inflictPercent,
			rawInflictCount,
			turnMin,
			turnMax,
			critStage,
			flinch,
			effectSequence,
			recoil,
			rawHealing,
			rawTarget,
			stat1,
			stat2,
			stat3,
			stat1Stage,
			stat2Stage,
			stat3Stage,
			stat1Percent,
			stat2Percent,
			stat3Percent,
			gigantimaxPower,
			flag_MakesContact,
			flag_Charge,
			flag_Recharge,
			flag_Protect,
			flag_Reflectable,
			flag_Snatch,
			flag_Mirror,
			flag_Punch,
			flag_Sound,
			flag_Gravity,
			flag_Defrost,
			flag_DistanceTriple,
			flag_Heal,
			flag_IgnoreSubstitute,
			flag_FailSkyBattle,
			flag_AnimateAlly,
			flag_Dance,
			flag_18,
			inflictCount,
			healing,
			target,
		] = s.split('\t');
		acc[id] = {
			name,
			version,
			canUseMove: canUseMove === 'True',
			type: Number(type),
			quality: Number(quality),
			category: Number(category),
			power: Number(power),
			accuracy: Number(accuracy),
			PP: Number(PP),
			priority: Number(priority),
			hitMin: Number(hitMin),
			hitMax: Number(hitMax),
			inflict: Number(inflict),
			inflictPercent: Number(inflictPercent),
			rawInflictCount: Number(rawInflictCount),
			turnMin: Number(turnMin),
			turnMax: Number(turnMax),
			critStage: Number(critStage),
			flinch: Number(flinch),
			effectSequence: Number(effectSequence),
			recoil: Number(recoil),
			rawHealing: Number(rawHealing),
			rawTarget: Number(rawTarget),
			stat1: Number(stat1),
			stat2: Number(stat2),
			stat3: Number(stat3),
			stat1Stage: Number(stat1Stage),
			stat2Stage: Number(stat2Stage),
			stat3Stage: Number(stat3Stage),
			stat1Percent: Number(stat1Percent),
			stat2Percent: Number(stat2Percent),
			stat3Percent: Number(stat3Percent),
			gigantimaxPower: Number(gigantimaxPower),
			flag_MakesContact: flag_MakesContact === 'True',
			flag_Charge: flag_Charge === 'True',
			flag_Recharge: flag_Recharge === 'True',
			flag_Protect: flag_Protect === 'True',
			flag_Reflectable: flag_Reflectable === 'True',
			flag_Snatch: flag_Snatch === 'True',
			flag_Mirror: flag_Mirror === 'True',
			flag_Punch: flag_Punch === 'True',
			flag_Sound: flag_Sound === 'True',
			flag_Gravity: flag_Gravity === 'True',
			flag_Defrost: flag_Defrost === 'True',
			flag_DistanceTriple: flag_DistanceTriple === 'True',
			flag_Heal: flag_Heal === 'True',
			flag_IgnoreSubstitute: flag_IgnoreSubstitute === 'True',
			flag_FailSkyBattle: flag_FailSkyBattle === 'True',
			flag_AnimateAlly: flag_AnimateAlly === 'True',
			flag_Dance: flag_Dance === 'True',
			flag_18: flag_18 === 'True',
			inflictCount,
			healing: healing === 'None' ? null : Number(healing),
			target,
		};
		return acc;
	}, {});

export default moves;

/** @type {Object<string, number>} */
const byName = Object.entries(moves).reduce((acc, [key, { name }]) => {
	acc[name] = Number(key);
	return acc;
}, {});

/**
 * @param {string} name
 */
export const getMoveByName = name => {
	console.assert(name in byName, `Move name '${name}' exists`);
	return byName[name];
};
