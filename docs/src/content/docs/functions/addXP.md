---
title: addXp
---

Adds XP to a user in a guild

### Parameters

| Parameter | Type | Description | Required | Default |
|-----------|------|-------------|----------|---------|
|userID|String \| Snowflake|The ID of the user|✅|N/A|
|guildID|String \| Snowflake|The ID of the guild|✅|N/A|
|xp|Number|The amount of XP to add|✅|N/A|
|emitEvent|Boolean|Whether to emit the levelUp event|❌|True|
|cause|Any|The cause of the level up, defined when a function affecting the xp is called|❌|N/A|


### Returns

Number - The new XP amount of the user