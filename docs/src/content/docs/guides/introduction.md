---
title: Introduction
description: A guide on how to get started with Discord-Rankup
---

Discord-RankUp is a package that allows you to create a rankup system for your discord bot.

It is very easy to use and has a many features to make your rankup system unique!

## Installation

To install, just run one of these commands below depending on your package manager.

```bash
# Using NPM
npm install discord-rankup
# Using Yarn
yarn add discord-rankup
# Using PNPM
pnpm add discord-rankup
```

## Basic Usage

First you need to initiate the Rankup Client.

```js
const { DiscordRankUp } = require('discord-rankup');

DiscordRankUp.init("MONGO_URL", client);
```

:::tip
Don't forget to replace `MONGO_URL` with your MongoDB URL and `client` with your discord.js Client.
:::

Once that is done, you can start managing the user's XP.

```js
DiscordRankUp.addXP(userID, guildID, xp, emitEvent, metadata)
```

- userID: The ID of the user.
- guildID: The ID of the guild.
- xp: The amount of XP to add.
- emitEvent (optional, true by default): Whether or not to emit the event if the user levels up.
- metadata (optional): Any additional data you want to pass with the event, can be anything.

Here is a list of more functions you can use:

:::note
More information about the functions can be found in the functions section.
:::

```js
DiscordRankUp.removeXP(userID, guildID, xp, emitEvent, metadata)
DiscordRankUp.setXP(userID, guildID, xp, emitEvent, metadata)
DiscordRankUp.fetch(userID, guildID)
DiscordRankUp.createMember(userID, guildID)
DiscordRankUp.deleteMember(userID, guildID)
```

## Events

There are 2 events in Discord-Rankup's latest version.

- [LevelDown](/events/leveldown/)
- [levelUp](/events/levelup/)

:::note
Discord-Rankup emits the event to the discord client, so the event handling is the same as any basic discord.js event.
:::

:::tip
Refer to the events section for more informations about these events.
:::

