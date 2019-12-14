/**
 * @param {string[]} values
 */
export default values =>
	values.map((value, index) => `export const ${value} = ${index};`);
