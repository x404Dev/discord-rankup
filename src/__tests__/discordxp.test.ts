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
    await xp.setXP('leaderboard1', 'guild1', 10);
    await xp.setXP('leaderboard2', 'guild1', 5);
    await xp.setXP('leaderboard3', 'guild1', 100);
    await xp.setXP('leaderboard4', 'guild1', 43);
    await xp.setXP('leaderboard5', 'guild1', 9);
    await xp.setXP('leaderboard6', 'guild1', 46);
    
    const leaderboard = await xp.fetchLeaderboard('guild1');
    expect(leaderboard).toHaveLength(6);
  });
});
