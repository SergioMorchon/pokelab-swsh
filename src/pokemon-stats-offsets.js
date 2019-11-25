/** 0x00 */
export const NATIONAL_ID_OFFSET = 0;
/** 0x02 */
export const GALAR_ID_OFFSET = NATIONAL_ID_OFFSET + 2;
/** 0x04 */
export const BASE_STATS_OFFSET = GALAR_ID_OFFSET + 2;
/** 0x0A */
export const EV_YIELD_OFFSET = BASE_STATS_OFFSET + 6;
/** 0x10 */
export const ABILITIES_OFFSET = EV_YIELD_OFFSET + 6;
/** 0x16 */
export const TYPES_OFFSET = ABILITIES_OFFSET + 3 * 2;
/** 0x18 */
export const EGG_GROUPS_OFFSET = TYPES_OFFSET + 2;
/** 0x1A */
export const EXP_GROUP_OFFSET = EGG_GROUPS_OFFSET + 2;
/** 0x1B */
export const HATCH_CYCLES_OFFSET = EXP_GROUP_OFFSET + 1;

/** 0x1C */
export const BLOCK_SIZE = HATCH_CYCLES_OFFSET + 1;
