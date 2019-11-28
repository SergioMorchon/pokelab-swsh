/** 0x00 */
export const NATIONAL_ID_OFFSET = 0;
/** 0x02 */
export const GALAR_ID_OFFSET = NATIONAL_ID_OFFSET + 2;
/** 0x04 */
export const BASE_STATS_OFFSET = GALAR_ID_OFFSET + 2;
/** 0x0A */
export const EV_YIELD_OFFSET = BASE_STATS_OFFSET + 6;
/** 0x10 */
export const ABILITIES_OFFSET = EV_YIELD_OFFSET + 2;
/** 0x12 */
export const TYPES_OFFSET = ABILITIES_OFFSET + 3 * 2;
/** 0x14 */
export const EGG_GROUPS_OFFSET = TYPES_OFFSET + 2;
/** 0x16 */
export const EXP_GROUP_OFFSET = EGG_GROUPS_OFFSET + 2;
/** 0x17 */
export const HATCH_CYCLES_OFFSET = EXP_GROUP_OFFSET + 1;

/** 0x18 */
export const BLOCK_SIZE = HATCH_CYCLES_OFFSET + 1;
