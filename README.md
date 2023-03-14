Discord-RankUP
--------------

Discord-RankUP is a package that allows you to create a rankup system for your discord bot.

It is very easy to use and has a many features to make your rankup system unique!

**Note:** This package is in early development, not all features have been added yet!

## Features

- Lightweight
- Easy to use
- Customizable
- Uses MongoDB
- Built for Discord.Js

## Installation

```bash
npm install discord-rankup
yarn add discord-rankup
pnpm add discord-rankup
```

## Basic Usage

First you need to connect to your MongoDB database.

```js
const { DiscordRankup } = require('discord-rankup');

const xp = new DiscordRankup("MONGOURL")
```

Once that is done, you can start managing the user's XP.

```js
xp.addXP(userID, guildID, xpAmount, emitEvent, cause)
```

userID: The user's ID
guildID: The guild's ID
xpAmount: The amount of XP to add
emitEvent (optional, true by default): Whether or not to emit the event if the user levels up
cause (optional): The cause of the XP gain, can be any object, it will be emitted in the event

```js
xp.removeXP(userID, guildID, xpAmount, emitEvent, cause)
```

```js
xp.setXP(userID, guildID, xpAmount, emitEvent, cause)
```

```js
xp.fetchXP(userID, guildID)
```

This will return a promise with the user's XP.


If you want to add the user to the database, you can use the following method.

```js
xp.createMember(userID, guildID)
```

This will create a user in the database, if the user already exists, it will return false.