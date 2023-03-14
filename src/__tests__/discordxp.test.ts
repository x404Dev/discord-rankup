import { DiscordRankup } from '..';
import dotenv from 'dotenv';

describe('DiscordRankup', () => {
  const xp = new DiscordRankup();

  beforeAll(() => {
    dotenv.config();
    xp.connect(process.env.RANKUP_DB!);
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
});
