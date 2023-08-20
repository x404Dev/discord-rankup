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
const xp = require('discord-rankup');

xp.init("MONGO_URL", client);
```

:::tip
Don't forget to replace `MONGO_URL` with your MongoDB URL and `client` with your Discord.JS Client.
:::

Once that is done, you can start managing the user's XP.

```js
xp.addXP(userID, guildID, xpAmount, emitEvent, cause)
```

- userID: The user's ID
- guildID: The guild's ID
- xpAmount: The amount of XP to add
- emitEvent (optional, true by default): Whether or not to emit the event if the user levels up
- cause (optional): The cause of the XP gain, can be any object, it will be emitted in the event

Here is a list of more functions you can use:

:::note
More informations about the functions can be found in the functions section.
:::

```js
xp.removeXP(userID, guildID, xpAmount, emitEvent, cause)
xp.setXP(userID, guildID, xpAmount, emitEvent, cause)
xp.fetchXP(userID, guildID)
xp.createMember(userID, guildID)
xp.deleteMember(userID, guildID)
```

## Events

Here's a list of events in Discord-Rankup's latest version.

- levelUp
- LevelDown

:::note
Discord-Rankup emits the event to the discord client, so the event handling is the same as any basic discord.js events.
:::

:::tip
Refer to the events section for more informations about these events.
:::

