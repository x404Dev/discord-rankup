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
 * The events emitted by DiscordRankup
 * @interface RankupEvents
 * @description The events emitted by DiscordRankup
 */
export interface RankupEvents {
  /** The event emitted when a user levels up */
  levelUp: [member: XPMember, cause?: any];
  /** The event emitted when a user ranks up */
  rankUp: [member: XPMember, cause?: any];
}
