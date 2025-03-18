const mysql = require('mysql2/promise');
const config = require('../config');

async function getConnection() {
    try {
        const connection = await mysql.createConnection(config.database);
        return connection;
    } catch (error) {
        console.error('Database-verbinding mislukt:', error);
        throw error;
    }
}

module.exports = { getConnection };
