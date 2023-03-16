import { BaseInteraction, Message } from 'discord.js';

/**
 * The model of a member in the database
 * @interface XPMember
 * @description The model of a member in the database
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
 * The options for a leaderboard query to the database
 * @interface LeaderboardQuery
 * @description The options for a leaderboard query to the database
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
 * The return value of the getCardData function
 * @interface XPCardData
 * @description The return value of the getCardData function
 */
export interface XPCardData {
  /** the total amount of xp required for the user to level up */
  requiredXP: number; //600
  /** the current amount of xp the user has */
  currentXP: number; // 550
  /** the current level of the user */
  level: number; // 5 starts at 475
  /** The amount of XP the user gained since his last level up */
  progressXP: number; // 75
  /** The amount of XP the user needs to level up */
  missingXP: number; // 50
}

/**
 * The events emitted by DiscordRankup
 * @interface RankupEvents
 * @description The events emitted by DiscordRankup
 */
export interface RankupEvents {
  /** The event emitted when a user levels up */
  levelUp: [member: XPMember, cause?: any];
}
