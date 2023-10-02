---
title: LeaderboardQuery
---

## Type

- [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

|property|type|description| Required | Default |
|--------|----|-----------|----------|---------|
|limit|[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)|The amount of members to fetch|❌|10|
|skip|[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)|The amount of members to skip|❌|0|
|exclude|[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)\>|list of userIDs to exclude from the leaderboard if any|❌|[null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null)| 
|include|[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)\>|list of userIDs to include in the leaderboard if any|❌|[null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null)|
