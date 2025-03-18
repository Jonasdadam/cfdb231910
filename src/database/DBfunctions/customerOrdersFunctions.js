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


exports.GetMemberNameByID = async function (discordID) {
    return new Promise((resolve, reject) => {

        db.query(`SELECT Member_Name FROM member_accounts WHERE Discord_ID = '${discordID}'`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.AddCustomerWeaponPurchase = async function (discordID, memberName, date, customerName, weapon, amount, amountMoney, note, trackID, orderStatus, statusSetBy) {
    return new Promise((resolve, reject) => {

        db.query(`INSERT INTO customers_orders (Discord_ID, Member_Name, Date, Customer_Name, Weapon_Type, Amount, Amount_BlackMoney, Note, Track_ID, Order_Status, Status_SetBy) VALUES ('${discordID}', '${memberName}', '${date}', '${customerName}', '${weapon}', '${amount}', '${amountMoney}', '${note}', '${trackID}', '${orderStatus}', '${statusSetBy}')`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.GetCustomerWeaponRequest = async function (trackId) {
    return new Promise((resolve, reject) => {

        db.query(`SELECT * FROM customers_orders WHERE Track_ID = '${trackId}'`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.UpdateCustomerWeaponRequest = async function (trackId, OrderStatus, statusSetBy) {
    return new Promise((resolve, reject) => {

        db.query(`UPDATE customers_orders SET Order_Status = '${OrderStatus}', Status_SetBy = '${statusSetBy}' WHERE Track_ID = '${trackId}'`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}