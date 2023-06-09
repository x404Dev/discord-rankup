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

## Documentation

View the documentation [here](https://discord-rankup.js.org)

## Basic Usage

First you need to initiate the Rankup Client.

```js
const xp = require('discord-rankup');

xp.init("MONGOURL", client);
```

Once that is done, you can start managing the user's XP.

```js
xp.addXP(userID, guildID, xpAmount, emitEvent, cause)
```

- userID: The user's ID
- guildID: The guild's ID
- xpAmount: The amount of XP to add
- emitEvent (optional, true by default): Whether or not to emit the event if the user levels up
- cause (optional): The cause of the XP gain, can be any object, it will be emitted in the event

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

```js
xp.deleteMember(userID, guildID)
```

This will delete the user from the database, if the user was deleted, it will return true.

## Events

Discord-RankUP has a few events that you can use.

- levelUp: Emitted when a user levels up
- (More to come)

```js
client.on('levelUp', (XPMember, cause) => {
    // Do something
})
```

## Types

```ts
interface XPMember {
    userID: string;
    guildID: string;
    xp: number;
    level: number;
}
```