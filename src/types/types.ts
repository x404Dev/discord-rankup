import { BaseInteraction, Message } from 'discord.js';

export interface XPMember {
  UserID: string;
  GuildID: string;
  XP: number;
  Level: number;
}

/**
 * @event DiscordRankup#levelUp
 * @param {XPMember} member The member who leveled up
 * @param {any} cause The cause of the level up, defined when a function affecting the xp is called
 */

/**
 * @event DiscordRankup#rankUp
 * @param {XPMember} member The member who ranked up
 * @param {any} cause The cause of the rank up, defined when a function affecting the xp is called
 */

export interface RankupEvents {
  levelUp: [member: XPMember, cause?: any];
  rankUp: [member: XPMember, cause?: any];
}
