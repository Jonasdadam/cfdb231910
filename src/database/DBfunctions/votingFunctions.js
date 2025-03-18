const db = require('../connect');


exports.SaveVoting = async function (interactionId, name) {
    return new Promise((resolve, reject) => {

        db.query(`INSERT INTO stemmingen (message_id, vraag) VALUES (?, ?)`, [interactionId, name], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.GetVotingID = async function (interactionId) {
    return new Promise((resolve, reject) => {

        db.query(`SELECT id FROM stemmingen WHERE message_id = ?`, [interactionId], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}

exports.GetUserVote = async function (stemmingId, userId) {
    return new Promise((resolve, reject) => {

        db.query(`SELECT * FROM stemmen WHERE stemming_id = ? AND user_id = ?`, [stemmingId, userId], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.UpdateVote = async function (stemmingId, userId, voteres) {
    return new Promise((resolve, reject) => {

        db.query(`UPDATE stemmen SET keuze = ? WHERE stemming_id = ? AND user_id = ?`, [voteres, stemmingId, userId], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.SaveUserVote = async function (stemmingId, userId, voteres) {
    return new Promise((resolve, reject) => {

        db.query(`INSERT INTO stemmen (stemming_id, user_id, keuze) VALUES (?, ?, ?)`, [stemmingId, userId, voteres], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.GetVotingTypeResults = async function (stemmingId, voteres) {
    return new Promise((resolve, reject) => {

        db.query(`SELECT COUNT(*) AS count FROM stemmen WHERE stemming_id = ? AND keuze = ?`, [stemmingId, voteres], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.GetAllVotes = async function (stemmingId, voteres) {
    return new Promise((resolve, reject) => {

        db.query(`SELECT * FROM stemmen WHERE stemming_id = ? AND keuze = ?`, [stemmingId, voteres], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.GetVotingName = async function (messageId) {
    return new Promise((resolve, reject) => {

        db.query(`SELECT vraag FROM stemmingen WHERE id = ?`, [messageId], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}