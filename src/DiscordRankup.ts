import mongoose, { ConnectOptions } from 'mongoose';
import xpmember from './models/xpmember';
import { LeaderboardQuery, XPCardData, XPMember } from './types/types';
import { Client, Snowflake } from 'discord.js';

/**
 * The main class for DiscordRankup, acts as a manager.
 * @class DiscordRankup
 */
class DiscordRankup {
  /**
   * The URL to the MongoDB database
   * @type {string}
   */
  private static mongoURL: string;
  /**
   * The Discord.js client
   * @type {Client}
   */
  private static client: Client;
  /**
   * Initialize the package and connect to the database
   * @param {string} url The URL to the MongoDB database
   * @param {Client} client The Discord.js client
   * @param {ConnectOptions} options The options to connect to the database
   * @returns {Promise<void>} The promise to connect to the database
   */
  public static async init(
    url: string,
    client: Client,
    options?: ConnectOptions,
  ) {
    // Connect to the database
    this.mongoURL = url;
    return await mongoose.connect(url, options);
  }

  /**
   * Disconnects from the database
   * @returns {Promise<void>} The promise to disconnect from the database
   */
  public static async disconnect(): Promise<void> {
    return await mongoose.disconnect();
  }

  /**
   * Create a member in the database if they don't exist
   * @param {string} userID The ID of the user
   * @param {string} guildID The ID of the guild
   * @returns {XPMember} The member's XP
   */
  public static async createMember(
    userID: string | Snowflake,
    guildID: string | Snowflake,
  ): Promise<XPMember | false> {
    // Check if the member exists on mongoDB with XPMember model
    const member = await xpmember.findOne({ UserID: userID, GuildID: guildID });
    if (member) return false;
    // Create a new member on mongoDB with XPMember model
    const newMember = new xpmember({
      UserID: userID,
      GuildID: guildID,
      XP: 0,
      Level: 0,
    });
    // Save the member to the database
    return newMember.save();
  }

  /**
   * Delete a member from the database
   * @param {string} userID The ID of the user
   * @param {string} guildID The ID of the guild
   * @returns {boolean} Whether the member was deleted successfully
   */
  public static async deleteMember(
    userID: string | Snowflake,
    guildID: string | Snowflake,
  ): Promise<boolean> {
    //delete the member from the database
    const member = await xpmember.findOneAndDelete({
      UserID: userID,
      GuildID: guildID,
    });
    return !!member;
  }

  /**
   * Add XP to the user and emit the levelUp event if the user levels up
   * @param {(string|Snowflake)} userID The ID of the user
   * @param {(string|Snowflake)} guildID The ID of the guild
   * @param {number} xp The amount of XP to add
   * @param {boolean} emitEvent Whether to emit the levelUp event
   * @param {any} cause The cause of the level up, defined when a function affecting the xp is called
   * @returns {Promise<number>} The new amount of user's XP
   */
  public static async addXP(
    userID: string | Snowflake,
    guildID: string | Snowflake,
    xp: number,
    emitEvent = true,
    cause?: any,
  ): Promise<number> {
    // Add xp to the user on mongoDB with XPMember model
    const member = await xpmember.findOne({ UserID: userID, GuildID: guildID });
    let memberToUpdate;
    //If the member doesn't exist, create them and wait for the promise to resolve to continue
    if (!member) {
      const newMember = await this.createMember(userID, guildID);
      memberToUpdate = newMember;
    } else {
      memberToUpdate = member;
    }
    // Update the member's XP
    memberToUpdate.XP += xp;
    const level = this.getLevelFromXP(memberToUpdate.XP);
    // Emit levelUp event if the user levels up
    if (level > memberToUpdate.Level && emitEvent) {
      this.client.emit('levelUp', memberToUpdate, cause);
    }
    memberToUpdate.Level = level;
    // Save the member to the database
    await memberToUpdate.save();
    return memberToUpdate.XP;
  }

  /**
   * Remove XP from the user and emit the levelUp event if the user levels up
   * @param {(string|Snowflake)} userID The ID of the user
   * @param {(string|Snowflake)} guildID The ID of the guild
   * @param {number} xp The amount of XP to remove
   * @param {boolean} emitEvent Whether to emit the levelUp event
   * @param {any} cause The cause of the level up, defined when a function affecting the xp is called
   * @returns {Promise<number>} The new amount of user's XP
   */
  public static async removeXP(
    userID: string | Snowflake,
    guildID: string | Snowflake,
    xp: number,
    emitEvent = true,
    cause?: any,
  ): Promise<number> {
    // Remove xp from the user on mongoDB with XPMember model
    const member = await xpmember.findOne({ UserID: userID, GuildID: guildID });
    let memberToUpdate;
    //If the member doesn't exist, create them and wait for the promise to resolve to continue
    if (!member) {
      const newMember = await this.createMember(userID, guildID);
      memberToUpdate = newMember;
    } else {
      memberToUpdate = member;
    }
    // Update the member's XP, if the user has less XP than the amount to remove, set it to 0
    memberToUpdate.XP = memberToUpdate.XP - xp < 0 ? 0 : memberToUpdate.XP - xp;
    const level = this.getLevelFromXP(memberToUpdate.XP);
    // Emit levelUp event if the user levels up
    if (level > memberToUpdate.Level && emitEvent) {
      this.client.emit('levelUp', memberToUpdate, cause);
    }
    memberToUpdate.Level = level;
    // Save the member to the database
    await memberToUpdate.save();
    return memberToUpdate.XP;
  }

  /**
   * Set the user's XP and emit the levelUp event if the user levels up
   * @param {string} userID The ID of the user
   * @param {string} guildID The ID of the guild
   * @param {number} xp The amount of XP to set
   * @param {Boolean} emitEvent Whether to emit the levelUp event
   * @param {any} cause The cause of the level up, defined when a function affecting the xp is called
   * @returns {number} The new amount of user's XP
   */
  public static async setXP(
    userID: string | Snowflake,
    guildID: string | Snowflake,
    xp: number,
    emitEvent = true,
    cause?: any,
  ): Promise<number> {
    if (xp < 0) throw new Error('XP cannot be negative');

    const member = await xpmember.findOne({ UserID: userID, GuildID: guildID });
    let memberToUpdate;
    //If the member doesn't exist, create them and wait for the promise to resolve to continue
    if (!member) {
      const newMember = await this.createMember(userID, guildID);
      memberToUpdate = newMember;
    } else {
      memberToUpdate = member;
    }
    // Update the member's XP
    memberToUpdate.XP = xp;
    const level = this.getLevelFromXP(xp);
    // Emit levelUp event if the user levels up
    if (level > memberToUpdate.Level && emitEvent && this.client) {
      this.client.emit('levelUp', memberToUpdate, cause);
    }
    memberToUpdate.Level = level;
    // Save the member to the database
    await memberToUpdate.save();
    return memberToUpdate.XP;
  }

  /**
   * Reset the user's XP to 0
   * @param {string} userID The ID of the user
   * @param {string} guildID The ID of the guild
   * @returns {number} The new amount of user's XP
   */
  public static async resetXP(
    userID: string | Snowflake,
    guildID: string | Snowflake,
  ): Promise<number> {
    return this.setXP(userID, guildID, 0);
  }

  /**
   * Returns a level from a specified XP amount
   * @param {number} xp The XP amount
   * @returns {number} The level
   */
  public static getLevelFromXP(xp: number): number {
    return Math.floor(0.1 * Math.sqrt(xp));
  }

  /**
   * Returns the XP required to reach a specified level
   * @param {number} level The level
   * @returns {number} The XP required
   */
  public static requiredXP(level: number): number {
    return (level / 0.1) ** 2;
  }

  /**
   * Returns the user's card data
   * @param {(string|Snowflake)} userID The ID of the user
   * @param {(string|Snowflake)} guildID The ID of the guild
   * @returns {Promise<XPCardData>} The user's card data
   */
  public static async getCardData(
    userID: string | Snowflake,
    guildID: string | Snowflake,
  ): Promise<XPCardData> {
    const member = await xpmember.findOne({ UserID: userID, GuildID: guildID });

    let memberCard: XPCardData;

    if (!member) {
      const newMember = await this.createMember(userID, guildID);
      if (!newMember) throw new Error("Couldn't create member!");
      memberCard = {
        requiredXP: this.requiredXP(newMember.Level + 1),
        currentXP: newMember.XP,
        level: newMember.Level,
        progressXP: newMember.XP - this.requiredXP(newMember.Level),
        missingXP: this.requiredXP(newMember.Level + 1) - newMember.XP,
      };
    } else {
      memberCard = {
        requiredXP: this.requiredXP(member.Level + 1),
        currentXP: member.XP,
        level: member.Level,
        progressXP: member.XP - this.requiredXP(member.Level),
        missingXP: this.requiredXP(member.Level + 1) - member.XP,
      };
    }
    return memberCard;
  }

  /**
   * fetch a member from the database
   * @param {string} userID The ID of the user
   * @param {string} guildID The ID of the guild
   * @returns {XPMember} The member's XPMember object
   */
  public static async fetch(
    userID: string | Snowflake,
    guildID: string | Snowflake,
  ): Promise<XPMember | null> {
    const member = xpmember.findOne({ UserID: userID, GuildID: guildID });
    if (!member) {
      const newMember = await this.createMember(userID, guildID);
      if (!newMember) throw new Error("Couldn't create member!");
      return newMember;
    }
    return member;
  }

  public static async getRank(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    userID: string | Snowflake,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    guildID: string | Snowflake,
  ): Promise<number> {
    //return the member's rank in the leaderboard
    const leaderboard = await xpmember
      .find({
        GuildID: guildID,
      })
      .sort({ XP: -1 })
      .exec();

    return leaderboard.findIndex((i) => i.UserID === userID) + 1;
  }

  /**
   * Fetch the leaderboard
   * @param {string} guildID The ID of the guild
   * @param {LeaderboardQuery} options The options for the leaderboard
   * @returns {XPMember[]} The leaderboard
   */
  public static async fetchLeaderboard(
    guildID: string | Snowflake,
    options?: LeaderboardQuery,
  ): Promise<XPMember[]> {
    // Fetch the members with the most xp within range and exclude the ids from options.exclude

    const query = {
      GuildID: guildID,
      UserID: { $nin: options?.exclude || [] },
    };

    const leaderboard: XPMember[] = await xpmember
      .find(query)
      .sort({ XP: -1 })
      .limit(options?.limit || 10)
      .skip(options?.skip || 0)
      .exec();

    if (options?.include) {
      options.include.forEach(async (id) => {
        const member = await this.fetch(id, guildID);
        if (member && !leaderboard.includes(member)) leaderboard.push(member);
      });
    }

    return leaderboard.sort((a, b) => b.XP - a.XP);
  }
}

export { DiscordRankup };

export default DiscordRankup;
