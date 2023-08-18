---
title: fetchLeaderboard
---

Fetches a user's XP Profile from a guild on the database

### Parameters

| Parameter | Type | Description | Required | Default |
|-----------|------|-------------|----------|---------|
|guildID|String \| Snowflake|The ID of the guild|✅|N/A|
|options|LeaderboardQuery|The options for the leaderboard|❌|{ limit: 10, page: 1, sort: 'DESC' }|


### Returns

XPMember[] - The leaderboard as per the options

:::note
The default query looks like this:
- Limit: 10
- Skip: 0
- Sorting: DESC

Basically it gets the top 10 members with the highest XP count
:::