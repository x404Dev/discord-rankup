---
title: Basic Bot
description: A basic example of a Discord bot using Discord-Rankup
---

This is a basic example of a Discord bot using Discord-Rankup.

## Prerequisites

- [Node.js](https://nodejs.org/en/) 12.0.0 or newer
- [Discord.js](https://discord.js.org/#/)
- [Discord-Rankup](https://www.npmjs.com/package/discord-rankup)
- Basic JavaDcript knowledge
- Basic discord.js knowledge

```js
const { Client } = require('discord.js');
const { DiscordRankUp, Randomizer } = require('discord-rankup');

// Creating the discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds, "other intents"] });

// Initialize the Rankup module
DiscordRankUp.init("MONGO_URL", client);

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


// If someone sends a message, add between 10 and 30 XP to the user
client.on('messageCreate', (message) => {
  DiscordRankUp.addXP(message.author.id, message.guild.id, Randomizer.randomXP(10, 30));
});

client.on("levelUp", (levelUpEvent) =>{
  const { newLevel, member, metadata } = levelEvent;

  // metadata here is set to a <TextChannel> with discord.js
  metadata.send(`🎉 <@${member.UserID}> leveled up to level ${newLevel}! 🎉`)
});

// Start the client
client.login("TOKEN");
```

This is a very basic bot that adds between 10 and 30 XP to a user every time they send a message.
