const db = require('../connect');

exports.GetMembersIdentifiers = async function () {
    return new Promise((resolve, reject) => {

        db.query(`SELECT Discord_ID, Member_Name, Member_Rank, Steam_Name, Fivem_Steam_ID, Fivem_ID FROM member_accounts WHERE Active_Member = 'true' ORDER BY Member_Name`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.GetAmountPotencias = async function () {
    return new Promise((resolve, reject) => {

        db.query(`SELECT COUNT(Member_ID) AS amountPotencias FROM member_accounts WHERE Active_Member = 'true' AND Member_Rank = 'Novato'`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.GetAmountSoldatoAusente = async function () {
    return new Promise((resolve, reject) => {

        db.query(`SELECT COUNT(Member_ID) AS amountSoldatoAusente FROM member_accounts WHERE Active_Member = 'true' AND Member_Rank = 'Soldato Ausente'`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.GetRegisteredMembers = async function () {
    return new Promise((resolve, reject) => {

        db.query(`SELECT Discord_ID, Active_Member FROM member_accounts`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.MakeMemberActive = async function (discordName, memberName, memberRank, lastPromo, joinDate, drugshedAccess, activeMember, discordID) {
    return new Promise((resolve, reject) => {

        db.query(`UPDATE member_accounts SET Discord_Name = ?, Member_Name = ?, Member_Rank = ?, Last_Promo = ?, Join_Date = ?, Drugshed_Access = ?, Active_Member = ? WHERE Discord_ID = ?`, [discordName, memberName, memberRank, lastPromo, joinDate, drugshedAccess, activeMember, discordID], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.RegisterMember = async function (discordID, discordName, memberName, memberRank, lastPromo, joinDate, drugshedAccess, activeMember) {
    return new Promise((resolve, reject) => {

        db.query(`INSERT INTO member_accounts(Discord_ID, Discord_Name, Member_Name, Member_Rank, Last_Promo, Join_Date, Drugshed_Access, Active_Member) VALUES ('${discordID}', '${discordName}', '${memberName}', '${memberRank}', '${lastPromo}', '${joinDate}', '${drugshedAccess}', '${activeMember}')`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}



exports.GetMeeloperDeepwebs = async function () {
    return new Promise((resolve, reject) => {

        db.query(`SELECT Name, Deepweb FROM gang_deepwebs WHERE Deepweb_Type = "Meeloper";`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.GetMemberName = async function (discordID) {
    return new Promise((resolve, reject) => {

        db.query(`SELECT Member_Name FROM member_accounts WHERE Discord_ID = ?`, [discordID], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.MakeMemberInactive = async function (memberRank, drugshedAccess, activeMember, discordID, date) {
    return new Promise((resolve, reject) => {

        db.query(`UPDATE member_accounts SET Member_Rank = ?, Leave_Date = ?, Drugshed_Access = ?, Active_Member = ? WHERE Discord_ID = ?`, [memberRank, date, drugshedAccess, activeMember, discordID], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.GetActiveMembers = async function () {
    return new Promise((resolve, reject) => {

        db.query(`SELECT Discord_ID, Member_Name FROM member_accounts WHERE Active_Member = 'true'`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.GetMemberInfoByID = async function (discordID) {
    return new Promise((resolve, reject) => {

        db.query(`SELECT * FROM member_accounts WHERE Discord_ID = ?`, [discordID], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.PromoteMember = async function (memberName, memberRank, discordID, promoDate) {
    return new Promise((resolve, reject) => {

        db.query(`UPDATE member_accounts SET Member_Name = ?, Member_Rank = ?, Last_Promo = ? WHERE Discord_ID = ?`, [memberName, memberRank, promoDate, discordID], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}