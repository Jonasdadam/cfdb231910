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


exports.AddWarehouse = async function (date, discordID, amount, item, origin, proofphoto, note) {
    return new Promise((resolve, reject) => {

        db.query(`INSERT INTO gang_warehouse_added (Date, Discord_ID, Amount, Item, Origin, Proof_Photo, Note) VALUES ('${date}','${discordID}','${amount}','${item}','${origin}','${proofphoto}','${note}')`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.RemoveWarehouse = async function (date, discordID, amount, item, destination, proofphoto, note) {
    return new Promise((resolve, reject) => {

        db.query(`INSERT INTO gang_warehouse_removed (Date, Discord_ID, Amount, Item, Destination, Proof_Photo, Note) VALUES ('${date}','${discordID}','${amount}','${item}','${destination}','${proofphoto}','${note}')`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.GetWarehouseLog = async function () {
    return new Promise((resolve, reject) => {

        db.query(`SELECT * FROM gang_warehouse_log ORDER BY WL_ID DESC LIMIT 1`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}

exports.AddWarehouseLog = async function (date, coke, cokeBags, meth, methBags, blackMoney, memberID) {
    return new Promise((resolve, reject) => {

        db.query(`INSERT INTO gang_warehouse_log (Date, Coke, Coke_Bags, Meth, Meth_Bags, BlackMoney, Last_ActionByID) VALUES ('${date}','${coke}','${cokeBags}','${meth}','${methBags}','${blackMoney}','${memberID}')`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}