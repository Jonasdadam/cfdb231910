const db = require('../connect');

exports.GetMemberNameByID = async function (memberID) {
    return new Promise((resolve, reject) => {

        db.query(`SELECT Member_Name FROM member_accounts WHERE Discord_ID = ?;`, [memberID], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.GetDrugshedAccessMembers = async function () {
    return new Promise((resolve, reject) => {

        db.query(`SELECT Discord_ID, Member_Name FROM member_accounts WHERE Drugshed_Access = 'true' ORDER BY Member_Name`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.AddDrugshed = async function (date, discordID, amount, type, origin, addedBy, proofphoto, note) {
    return new Promise((resolve, reject) => {

        db.query(`INSERT INTO gang_drugshed_added (Date, Discord_ID, Amount, Drugs_Type, Origin, AddedBy_ID, Proof_Photo, Note) VALUES ('${date}','${discordID}','${amount}','${type}','${origin}','${addedBy}','${proofphoto}','${note}')`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.RemoveDrugshed = async function (date, discordID, amount, type, destination, proofphoto, note) {
    return new Promise((resolve, reject) => {

        db.query(`INSERT INTO gang_drugshed_removed (Date, Discord_ID, Amount, Drugs_Type, Destination, Proof_Photo, Note) VALUES ('${date}','${discordID}','${amount}','${type}','${destination}','${proofphoto}','${note}')`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}