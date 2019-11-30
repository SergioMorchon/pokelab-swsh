const dataView = (buffer: ArrayBuffer, baseOffset: number) => {
	const bytes = new Uint8Array(buffer);
	return {
		getUint8: (offset: number) => bytes[baseOffset + offset],
		getUint16: (offset: number) => {
			offset = baseOffset + offset;
			return bytes[offset] + (bytes[offset + 1] << 8);
		},
	};
};

export type DataView = ReturnType<typeof dataView>;

export default dataView;
