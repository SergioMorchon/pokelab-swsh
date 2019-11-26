import { readFileSync } from 'fs';
import { getMoveByName } from './moves.js';

const tms = readFileSync('./data/raw/sword_shield_tm_list.txt', 'utf-8')
	.split(/\r?\n/)
	.map(s => getMoveByName(s.replace(/^- \[TM\d+\] /, '')));

export const serialize = () =>
	tms.reduce((data, tm, index) => {
		data.setUint16(index * Uint16Array.BYTES_PER_ELEMENT, tm, true);
		return data;
	}, new DataView(new ArrayBuffer(tms.length * Uint16Array.BYTES_PER_ELEMENT)));

export default tms;
