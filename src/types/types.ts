/**
 * @typedef {object} XPMember
 */
export interface XPMember {
  /** The ID of the User */
  UserID: string;
  /** The ID of the Guild */
  GuildID: string;
  /** The amount of XP the user has */
  XP: number;
  /** The level of the user */
  Level: number;
}

/**
 * @typedef {object} LeaderboardQuery
 */
export interface LeaderboardQuery {
  /** The amount of members to fetch */
  limit?: number;
  /** The amount of members to skip */
  skip?: number;
  /** list of userIDs to exclude from the leaderboard if any */
  exclude?: string[];
  /** list of userIDs to include in the leaderboard if any */
  include?: string[];
}

/**
 * @typedef {object} XPCardData
 */
export interface XPCardData {
  /** The amount of XP required to level up */
  requiredXP: number;
  /** The amount of XP the user currently has */
  currentXP: number;
  /** The level of the user */
  level: number;
  /** The amount of XP the user has progressed */
  progressXP: number;
  /** The amount of XP the user is missing to level up */
  missingXP: number;
}
