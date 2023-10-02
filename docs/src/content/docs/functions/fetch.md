---
title: fetch
---

Fetches a user's XP Profile from a guild on the database

### Parameters

| Parameter | Type | Description | Required | Default |
|-----------|------|-------------|----------|---------|
|userID|[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Snowflake](https://old.discordjs.dev/#/docs/discord.js/main/typedef/Snowflake)|The ID of the user|✅|None|
|guildID|[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Snowflake](https://old.discordjs.dev/#/docs/discord.js/main/typedef/Snowflake)|The ID of the guild|✅|None|


### Returns

[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[XPMember](/typedefs/xpmember/)\> - The member's XP Profile
