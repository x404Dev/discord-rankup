import xp from '..';
import dotenv from 'dotenv';
import { Client } from 'discord.js';

describe('DiscordRankup', () => {
  beforeAll(() => {
    dotenv.config();
    xp.init(process.env.RANKUP_DB!, new Client({ intents: [] }));
  });

  afterAll(() => {
    xp.disconnect();
  });

  test('addXp should increase user XP', async () => {
    await xp.addXP('user1', 'guild1', 10);
    const user = await xp.fetch('user1', 'guild1');
    expect(user!.XP).toBe(10);
  });

  //test removeXp
  test('removeXp should decrease user XP', async () => {
    await xp.removeXP('user1', 'guild1', 5);
    const user = await xp.fetch('user1', 'guild1');
    expect(user!.XP).toBe(5);
  });

  //test setXp
  test('setXp should set user XP', async () => {
    await xp.setXP('user1', 'guild1', 0);
    const user = await xp.fetch('user1', 'guild1');
    expect(user!.XP).toBe(0);
  });

  //test createMember
  test('createMember should create a new user', async () => {
    await xp.createMember('user2', 'guild1');
    const user = await xp.fetch('user2', 'guild1');
    expect(user!.XP).toBe(0);
  });

  //test deleteMember
  test('deleteMember should delete a user', async () => {
    await xp.deleteMember('user1', 'guild1');
    await xp.deleteMember('user2', 'guild1');
    const user = await xp.fetch('user2', 'guild1');
    expect(user).toBe(null);
  });

  //test leaderboard
  test('leaderboard should return a list of users', async () => {
    await xp.setXP('leaderboard1', 'guild2', 10);
    await xp.setXP('leaderboard2', 'guild2', 5);
    await xp.setXP('leaderboard3', 'guild2', 100);
    await xp.setXP('leaderboard4', 'guild2', 43);
    await xp.setXP('leaderboard5', 'guild2', 9);
    await xp.setXP('leaderboard6', 'guild2', 46);

    const leaderboard = await xp.fetchLeaderboard('guild2');
    expect(leaderboard).toHaveLength(6);
  });

  //test requiredXP and getLevelFromXP
  test('requireXP and getLevelFromXP should return the correct values', async () => {
    const level = xp.getLevelFromXP(10500);
    const requiredXP = xp.requiredXP(level);
    expect(level).toBe(10);
    expect(requiredXP).toBe(10000);
  });

  //test getCardData
  test('getCardData should return the correct values', async () => {
    await xp.setXP('cardData', 'guild1', 10500);
    const cardData = await xp.getCardData('cardData', 'guild1');
    expect(cardData.level).toBe(10);
    expect(cardData.requiredXP).toBe(12100);
    expect(cardData.currentXP).toBe(10500);
    expect(cardData.progressXP).toBe(500);
    expect(cardData.missingXP).toBe(1600);
  });
});
