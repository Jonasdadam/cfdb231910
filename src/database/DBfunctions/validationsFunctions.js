/*Used in:
    > events/validations/buttonValidator.js
    > events/validations/chatInputCommandValidator.js
    > events/validations/contextMenuCommandValidator.js
    > events/validations/ModalCommandValidator.js
    > events/validations/selectMenuValidator.js
*/
const db = require('../connect');

exports.GetAllowedUsers = async function () {
    return new Promise((resolve, reject) => {

        db.query(`SELECT Discord_ID FROM member_accounts WHERE Active_Member = 'true';`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}