import { readFileSync } from 'fs';
import { getMoveByName } from './moves.js';

const trs = readFileSync('./data/raw/sword_shield_tr_list.txt', 'utf-8')
	.split(/\r?\n/)
	.map(s => getMoveByName(s.replace(/^- \[TR\d+\] /, '')));

export const serialize = () =>
	trs.reduce((data, tm, index) => {
		data.setUint16(index * Uint16Array.BYTES_PER_ELEMENT, tm, true);
		return data;
	}, new DataView(new ArrayBuffer(trs.length * Uint16Array.BYTES_PER_ELEMENT)));

export default trs;
