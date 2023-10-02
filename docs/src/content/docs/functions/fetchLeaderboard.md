---
title: fetchLeaderboard
---

Fetches a user's XP Profile from a guild on the database

### Parameters

| Parameter | Type | Description | Required | Default |
|-----------|------|-------------|----------|---------|
|guildID|[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Snowflake](https://old.discordjs.dev/#/docs/discord.js/main/typedef/Snowflake)|The ID of the guild|✅|None|
|options|[LeaderboardQuery](/typedefs/leaderboardquery/)|The options for the leaderboard|❌|{ limit: 10, skip: 0 }|


### Returns

[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\< [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<[XPMember](/typedefs/xpmember/)\> \> - List of members as per the options

:::note
A query can look like this:
```js
const LeaderboardQuery = {
  limit: 10,
  skip: 20,
  exclude: ["1158137762503999670", "513709333494628355"]
}
```

This query returns only the top between 21 and 30 members with the highest XP not including the two users with the defined UserIDs
:::