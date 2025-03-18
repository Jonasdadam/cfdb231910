const db = require('../connect');

exports.GetAvailableWeapons = async function () {
    return new Promise((resolve, reject) => {

        db.query(`SELECT * FROM gun_dealer WHERE Available = 'true' ORDER BY Weapon_Category DESC, Weapon_Name ASC`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.GetMemberNameAndRankByID = async function (discordID) {
    return new Promise((resolve, reject) => {

        db.query(`SELECT Member_Name, Member_Rank FROM member_accounts WHERE Discord_ID = '${discordID}'`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.GetWeekPurchasedWeapons = async function (discordID, startDate, endDate) {
    return new Promise((resolve, reject) => {

        db.query(`SELECT COUNT(Purchase_ID) AS Amount_Purchased FROM member_orders WHERE Discord_ID = '${discordID}' AND Date BETWEEN '${startDate}' AND '${endDate}'`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.AddWeaponPurchase = async function (discordID, date, amount, weaponType) {
    return new Promise((resolve, reject) => {

        db.query(`INSERT INTO member_orders (Discord_ID, Date, Amount, Weapon_Type) VALUES ('${discordID}','${date}','${amount}','${weaponType}')`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}