---
title: Basic Bot
description: A basic example of a Discord bot using Discord-Rankup
---

This is a basic example of a Discord bot using Discord-Rankup.

## Prerequisites

- [Node.js](https://nodejs.org/en/) 12.0.0 or newer
- [Discord.js](https://discord.js.org/#/)
- [Discord-Rankup](https://www.npmjs.com/package/discord-rankup)
- Basic Javascript knowledge
- Basic Discord.JS knowledge

```js
const { Client } = require('discord.js');
const xp = require('discord-rankup');

//Create the discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//Init the rankup module
xp.init("MONGO_URL", client);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

//On message, add 10 XP to the user
client.on('messageCreate', (message) => {
    xp.addXP(message.author.id, message.guild.id, 10);
})

// Start the client
client.login("TOKEN");
```

This is a very basic bot that adds 10 XP to the user every time they send a message.
