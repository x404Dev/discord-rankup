---
title: setXP
---

Sets the XP of a user in a guild

### Parameters

| Parameter | Type | Description | Required | Default |
|-----------|------|-------------|----------|---------|
|userID|String \| Snowflake|The ID of the user|✅|N/A|
|guildID|String \| Snowflake|The ID of the guild|✅|N/A|
|xp|Number|The amount of XP to set|✅|N/A|
|emitEvent|Boolean|Whether to emit the levelUp event|❌|True|
|metadata|T|Metadata to be sent with levelUp or levelDown events|❌|N/A|


### Returns

Number - The new XP amount of the user

:::info
LevelUp event will be emitted if the user's level changes, wether it's higher or lower
:::