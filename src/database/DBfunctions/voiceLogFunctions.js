const db = require('../connect');

exports.GetJoinTime = async function (userId, guildId, channelId) {
    return new Promise((resolve, reject) => {

        db.query(`SELECT join_time FROM voice_logs WHERE user_id = ? AND guild_id = ? AND channel_id = ? ORDER BY id DESC LIMIT 1`, [userId, guildId, channelId], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.SaveTimeSpent = async function (timeSpent, userId, guildId, channelId, joinTime) {
    return new Promise((resolve, reject) => {

        db.query(`UPDATE voice_logs SET time_spent = ? WHERE user_id = ? AND guild_id = ? AND channel_id = ? AND join_time = ?`, [timeSpent, userId, guildId, channelId, joinTime], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.CreateVoiceSession = async function (userId, guildId, channelId, joinTime) {
    return new Promise((resolve, reject) => {

        db.query(`INSERT INTO voice_logs (user_id, guild_id, channel_id, join_time) VALUES (?, ?, ?, ?)`, [userId, guildId, channelId, joinTime], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.GetVoiceLog = async function (userId, guildId) {
    return new Promise((resolve, reject) => {

        db.query(`SELECT channel_id, SUM(time_spent) AS total_time FROM voice_logs WHERE user_id = ? AND guild_id = ? GROUP BY channel_id`, [userId, guildId], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}

exports.GetCompletedSessions = async function (userId, guildId, startTime) {
    return new Promise((resolve, reject) => {

        db.query(`SELECT channel_id, SUM(time_spent) AS total_time_spent FROM voice_logs WHERE user_id = ? AND guild_id = ? AND time_spent > 0 AND join_time >= ? GROUP BY channel_id`, [userId, guildId, startTime], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.GetActiveSessions = async function (userId, guildId, startTime) {
    return new Promise((resolve, reject) => {

        db.query(`SELECT channel_id, join_time FROM voice_logs WHERE user_id = ? AND guild_id = ? AND time_spent = 0 AND join_time >= ?`, [userId, guildId, startTime], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}