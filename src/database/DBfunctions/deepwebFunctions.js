const db = require('../connect');

exports.GetTypeDeepwebs = async function (deepwebTypes) {
    return new Promise((resolve, reject) => {
        if (deepwebTypes.length === 0) {
            return reject(new Error("Geen types opgegeven"));
        }

        // Maak een array met het juiste aantal vraagtekens (?)
        let placeholders = deepwebTypes.map(() => '?').join(', ');

        // Bouw de query
        let query = `SELECT Name, Deepweb FROM gang_deepwebs WHERE Deepweb_Type IN (${placeholders});`;

        // Voer de query uit met de deepwebTypes array als parameter
        db.query(query, deepwebTypes, function (err, result) {
            if (err) {
                console.error(err);
                return reject(err);
            }

            resolve(result);
        });
    });
}

exports.AddDeepweb = async function (name, deepweb, type) {
    return new Promise((resolve, reject) => {

        db.query(`INSERT INTO gang_deepwebs (Name, Deepweb, Deepweb_Type) VALUES (?, ?, ?);`, [name, deepweb, type], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}

exports.DeleteDeepweb = async function (name) {
    return new Promise((resolve, reject) => {

        db.query(`DELETE FROM gang_deepwebs WHERE Name = ?;`, [name], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}

exports.EditDeepweb = async function (deepweb, name) {
    return new Promise((resolve, reject) => {

        db.query(`UPDATE gang_deepwebs SET Deepweb = ? WHERE Name = ?;`, [deepweb, name], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.GetMeelopers = async function () {
    return new Promise((resolve, reject) => {

        db.query(`SELECT Member_Name FROM member_accounts WHERE Member_Rank = 'Novato' OR Member_Rank = 'Soldato Ausente';`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


