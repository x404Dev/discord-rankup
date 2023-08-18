---
title: init
---

Initializes the client to use the database

### Parameters

| Parameter | Type | Description | Required | Default |
|-----------|------|-------------|----------|---------|
|url|String|The URL to the MongoDB database|✅|N/A|
|client|Client|The Discord.js client|✅|N/A|
|options|ConnectOptions|The options to connect to the database|❌|{}|

### Returns

Promise\<void\> - The promise to connect to the database

:::tip
ConnectOptions is an interface from the [mongoose](https://www.npmjs.com/package/mongoose) package.
:::