const db = require('../connect');


exports.GetMembers = async function (discordID) {
    return new Promise((resolve, reject) => {

        db.query(`SELECT Discord_ID, Member_Name, Member_Rank FROM member_accounts WHERE Active_Member = 'true'`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}
