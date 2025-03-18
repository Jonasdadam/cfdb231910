const db = require('../connect');

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


exports.GetSalaryRound = async function (memberID) {
    return new Promise((resolve, reject) => {

        db.query(`SELECT * FROM novato_salary_period ORDER BY SP_ID DESC LIMIT 1`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.AddPlukSalary = async function (salaryRound, memberID, type, amount, date, salary) {
    return new Promise((resolve, reject) => {

        db.query(`INSERT INTO novato_pluk_salary (SalaryRound, Member_ID, Type, Amount, Date, Salary) VALUES ('${salaryRound}','${memberID}','${type}','${amount}','${date}','${salary}')`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.AddSellSalary = async function (salaryRound, memberID, type, amount, money, date, salary) {
    return new Promise((resolve, reject) => {

        db.query(`INSERT INTO novato_sell_salary (SalaryRound, Member_ID, Type, Amount, Money, Date, Salary) VALUES ('${salaryRound}','${memberID}','${type}','${amount}','${money}','${date}','${salary}')`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.GetSalarys = async function (salaryRound) {
    return new Promise((resolve, reject) => {

        db.query(`SELECT ps.Member_ID, ps.totalPlukSalary, COALESCE(ss.totalSellSalary, 0) AS totalSellSalary, ps.totalPlukSalary + COALESCE(ss.totalSellSalary, 0) AS totalSalary FROM (SELECT Member_ID, COALESCE(SUM(Salary), 0) AS totalPlukSalary FROM novato_pluk_salary WHERE SalaryRound = ? GROUP BY Member_ID) AS ps LEFT JOIN (SELECT Member_ID, COALESCE(SUM(Salary), 0) AS totalSellSalary FROM novato_sell_salary WHERE SalaryRound = ? GROUP BY Member_ID) AS ss ON ps.Member_ID = ss.Member_ID`, [salaryRound, salaryRound], function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}


exports.GetPersonalSalary = async function (salaryRound, memberId) {
    return new Promise((resolve, reject) => {
  
      db.query(`
        SELECT 
          ps.Member_ID, 
          ps.totalPlukSalary, 
          COALESCE(ss.totalSellSalary, 0) AS totalSellSalary, 
          ps.totalPlukSalary + COALESCE(ss.totalSellSalary, 0) AS totalSalary 
        FROM 
          (SELECT 
             Member_ID, 
             COALESCE(SUM(Salary), 0) AS totalPlukSalary 
           FROM 
             novato_pluk_salary 
           WHERE 
             SalaryRound = ? AND Member_ID = ? 
           GROUP BY 
             Member_ID) AS ps 
        LEFT JOIN 
          (SELECT 
             Member_ID, 
             COALESCE(SUM(Salary), 0) AS totalSellSalary 
           FROM 
             novato_sell_salary 
           WHERE 
             SalaryRound = ? AND Member_ID = ? 
           GROUP BY 
             Member_ID) AS ss 
        ON 
          ps.Member_ID = ss.Member_ID`, 
        [salaryRound, memberId, salaryRound, memberId], 
        function (err, result) {
          if (err) {
            console.error(err)
            reject(err)
          }
  
          resolve(result)
        })
    })
  }



  exports.ResetSalary = async function (newSalaryRound, date) {
    return new Promise((resolve, reject) => {

        db.query(`INSERT INTO novato_salary_period (SalarisRonde, StartDate) VALUES ('${newSalaryRound}','${date}')`, function (err, result) {
            if (err) {
                console.error(err)
                reject(err)
            }

            resolve(result)
        })
    })
}