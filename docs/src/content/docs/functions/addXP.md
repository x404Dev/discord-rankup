---
title: addXp
---

Adds XP to a user in a guild

### Parameters

| Parameter | Type | Description | Required | Default |
|-----------|------|-------------|----------|---------|
|userID|[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Snowflake](https://old.discordjs.dev/#/docs/discord.js/main/typedef/Snowflake)|The ID of the user|✅|None|
|guildID|[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Snowflake](https://old.discordjs.dev/#/docs/discord.js/main/typedef/Snowflake)|The ID of the guild|✅|None|
|xp|[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)|The amount of XP to add|✅|None|
|emitEvent|[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)|If the levelUp event should be emitted|❌|True|
|metadata|Any|Metadata to be sent with levelUp or levelDown events|❌|[null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null)|


### Returns

[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)\> - The new XP amount of the user
