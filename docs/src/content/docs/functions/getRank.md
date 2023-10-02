---
title: getRank
---

Get the user's rank in the leaderboard

### Parameters

| Parameter | Type | Description | Required | Default |
|-----------|------|-------------|----------|---------|
|userID|[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Snowflake](https://old.discordjs.dev/#/docs/discord.js/main/typedef/Snowflake)|The ID of the user|✅|None|
|guildID|[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Snowflake](https://old.discordjs.dev/#/docs/discord.js/main/typedef/Snowflake)|The ID of the guild|✅|None|

### Returns

[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)\> - The user's position on the leaderboard