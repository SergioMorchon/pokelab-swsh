export const getUint16 = (bytes: Uint8Array, offset: number) =>
	bytes[offset] + (bytes[offset + 1] << 8);
