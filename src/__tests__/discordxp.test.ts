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
    await xp.deleteMember('user2', 'guild1');
    const user = await xp.fetch('user2', 'guild1');
    expect(user).toBe(null);
  });
});
