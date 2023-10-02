---
title: init
---

Initializes the client to use the database

### Parameters

| Parameter | Type | Description | Required | Default |
|-----------|------|-------------|----------|---------|
|url|[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|The URL to the MongoDB database|✅|None|
|client|[Client](https://old.discordjs.dev/#/docs/discord.js/main/class/Client)|The discord.js client|✅|None|
|options|[ConnectOptions](https://mongoosejs.com/docs/api/mongoose.html#Mongoose.prototype.connect())|The options to connect to the database|❌|{ }|

### Returns

[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[Mongoose](https://mongoosejs.com/docs/api/mongoose.html#Mongoose())\> - Resolves to [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) by using `Mongoose.connect()` if connection succeeded

:::tip
ConnectOptions is an interface from the [mongoose](https://www.npmjs.com/package/mongoose) package.
:::