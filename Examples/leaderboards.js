const { DiscordRankup } = require('discord-rankup');
const { EmbedBuilder } = require('discord.js');

// Leaderboard page 1 (Rank 1-10)
const leaderboard1 = await DiscordRankup.fetchLeaderboard("(guildID)", { limit: 10, include: ["userID of who ran the command"]})
console.log(leaderboard1)

// Leaderboard page 2 (Rank 11-20)
const leaderboard2 = await DiscordRankup.fetchLeaderboard("(guildID)", { limit: 10, skip: 10, include: ["userID of who ran the command"] })
console.log(leaderboard2)

// Leaderboard page 3 (Rank 21-30)
const leaderboard3 = await DiscordRankup.fetchLeaderboard("(guildID)", { limit: 10, skip: 20, include: ["userID of who ran the command"] })
console.log(leaderboard3)

//Put in en embed

const fields = [];

const pageNumber = 1

for(let i = 0; i < leaderboard1.length; i++) {
    const rank = (i + 1) + (pageNumber * 10) - 10;
    const tag = client.users.fetch(leaderboard1[i].userID).tag
    fields.push({ name: `**${rank}.** ${tag}`, value: `XP: ${leaderboard1[i].xp}`, inline: true })
}

const embed = new EmbedBuilder()
    .setTitle("Leaderboard - Page 1")
    .setDescription("The top 10 users in this server")
    .addFields(fields)

//There you go :)