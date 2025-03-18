const { getConnection } = require('../connect');

async function GetAllowedUsers() {
    try {
        const db = await getConnection(); // Haal een nieuwe connectie op
        const [results] = await db.execute("SELECT * FROM member_accounts"); // ✅ Gebruik `execute()` in plaats van `query()`
        await db.end(); // Sluit de connectie
        return results;
    } catch (error) {
        console.error('Fout bij ophalen van toegestane gebruikers:', error);
        throw error;
    }
}

module.exports = { GetAllowedUsers };
