import mongoose from 'mongoose';
import EventEmitter from 'events';
import xpmember from './models/xpmember';
import { XPMember } from './types/types';
import { Snowflake } from 'discord.js';

export class DiscordRankup extends EventEmitter {
  private mongoURL: string;

  constructor() {
    super();
  }

  /**
   * @param url The URL to the MongoDB database
   * @returns mongoose connection
   */
  public async connect(url: string, options?: mongoose.ConnectOptions) {
    // Connect to the database
    this.mongoURL = url;
    return await mongoose.connect(url, options);
  }

  /**
   * @description Disconnects from the database
   */
  public async disconnect() {
    return await mongoose.disconnect();
  }

  /**
   * @param userID The ID of the user
   * @param guildID The ID of the guild
   * @returns The member's XP
   * @description Create a member in the database if they don't exist
   */
  public async createMember(
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
   * @param userID The ID of the user
   * @param guildID The ID of the guild
   * @returns The new amount of user's XP
   * @description Add XP to the user
   */
  public async addXP(
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
    const level = Math.floor(0.05 * Math.sqrt(xp));
    // Emit levelUp event if the user levels up
    if (level > memberToUpdate.Level && emitEvent) {
      this.emit('levelUp', memberToUpdate, cause);
    }
    memberToUpdate.Level = level;
    // Save the member to the database
    await memberToUpdate.save();
    return memberToUpdate.XP;
  }

  /**
   * @param userID The ID of the user
   * @param guildID The ID of the guild
   * @param xp The amount of XP to remove
   * @param emitEvent Whether to emit the levelUp event
   * @param cause The cause of the level up, defined when a function affecting the xp is called
   * @returns The new amount of user's XP
   * @description Remove XP from the user
   */
  public async removeXP(
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
    const level = Math.floor(0.05 * Math.sqrt(xp));
    // Emit levelUp event if the user levels up
    if (level > memberToUpdate.Level && emitEvent) {
      this.emit('levelUp', memberToUpdate, cause);
    }
    memberToUpdate.Level = level;
    // Save the member to the database
    await memberToUpdate.save();
    return memberToUpdate.XP;
  }

  public async setXP(
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
    const level = Math.floor(0.05 * Math.sqrt(xp));
    // Emit levelUp event if the user levels up
    if (level > memberToUpdate.Level && emitEvent) {
      this.emit('levelUp', memberToUpdate, cause);
    }
    memberToUpdate.Level = level;
    // Save the member to the database
    await memberToUpdate.save();
    return memberToUpdate.XP;
  }

  /**
   * @param userID The ID of the user
   * @param guildID The ID of the guild
   * @returns The members XPMember object
   * @description Get the member's XP
   */
  public async fetch(
    userID: string | Snowflake,
    guildID: string | Snowflake,
  ): Promise<XPMember | null> {
    const member = xpmember.findOne({ UserID: userID, GuildID: guildID });
    return member;
  }
}
