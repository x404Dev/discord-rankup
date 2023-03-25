import { DiscordRankup } from '..';
import dotenv from 'dotenv';
import { Client } from 'discord.js';

describe('DiscordRankup', () => {
  beforeAll(() => {
    dotenv.config();
    DiscordRankup.init(process.env.RANKUP_DB!, new Client({ intents: [] }));
  });

  afterAll(() => {
    DiscordRankup.disconnect();
  });

  test('addXp should increase user XP', async () => {
    await DiscordRankup.addXP('user1', 'guild1', 10);
    const user = await DiscordRankup.fetch('user1', 'guild1');
    expect(user!.XP).toBe(10);
  });

  //test removeXp
  test('removeXp should decrease user XP', async () => {
    await DiscordRankup.removeXP('user1', 'guild1', 5);
    const user = await DiscordRankup.fetch('user1', 'guild1');
    expect(user!.XP).toBe(5);
  });

  //test setXp
  test('setXp should set user XP', async () => {
    await DiscordRankup.setXP('user1', 'guild1', 0);
    const user = await DiscordRankup.fetch('user1', 'guild1');
    expect(user!.XP).toBe(0);
  });

  //test createMember
  test('createMember should create a new user', async () => {
    await DiscordRankup.createMember('user2', 'guild1');
    const user = await DiscordRankup.fetch('user2', 'guild1');
    expect(user!.XP).toBe(0);
  });

  //test deleteMember
  test('deleteMember should delete a user', async () => {
    await DiscordRankup.deleteMember('user1', 'guild1');
    await DiscordRankup.deleteMember('user2', 'guild1');
    const user = await DiscordRankup.fetch('user2', 'guild1');
    expect(user).toBe(null);
  });

  //test leaderboard
  test('leaderboard should return a list of users', async () => {
    await DiscordRankup.setXP('leaderboard1', 'guild2', 10);
    await DiscordRankup.setXP('leaderboard2', 'guild2', 5);
    await DiscordRankup.setXP('leaderboard3', 'guild2', 100);
    await DiscordRankup.setXP('leaderboard4', 'guild2', 43);
    await DiscordRankup.setXP('leaderboard5', 'guild2', 9);
    await DiscordRankup.setXP('leaderboard6', 'guild2', 46);

    const leaderboard = await DiscordRankup.fetchLeaderboard('guild2');
    expect(leaderboard).toHaveLength(6);
  });

  //test requiredXP and getLevelFromXP
  test('requireXP and getLevelFromXP should return the correct values', async () => {
    const level = DiscordRankup.getLevelFromXP(10500);
    const requiredXP = DiscordRankup.requiredXP(level);
    expect(level).toBe(10);
    expect(requiredXP).toBe(10000);
  });

  //test getCardData
  test('getCardData should return the correct values', async () => {
    await DiscordRankup.setXP('cardData', 'guild1', 10500);
    const cardData = await DiscordRankup.getCardData('cardData', 'guild1');
    expect(cardData.level).toBe(10);
    expect(cardData.requiredXP).toBe(12100);
    expect(cardData.currentXP).toBe(10500);
    expect(cardData.progressXP).toBe(500);
    expect(cardData.missingXP).toBe(1600);
  });
});
