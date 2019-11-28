const dataView = (buffer: ArrayBuffer, baseOffset: number) => ({
	getUint8(offset: number) {
		return new Uint8Array(buffer)[baseOffset + offset];
	},
	getUint16(offset: number, littleEndian?: boolean) {
		offset = baseOffset + offset;
		const arr = new Uint8Array(buffer);
		const b0 = arr[offset];
		const b1 = arr[offset + 1];
		return littleEndian ? b0 + (b1 << 8) : (b0 << 8) + b1;
	},
});

export type DataView = ReturnType<typeof dataView>;

export default dataView;
