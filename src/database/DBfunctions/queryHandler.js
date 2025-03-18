const { createConnection } = require('../connect');
const { sendToDevChannel } = require('../../utils/devNotifier');

async function executeQuery(query, params = []) {
    const maxRetries = 2;
    let attempt = 0;
    let connection;

    while (attempt < maxRetries) {
        try {
            connection = await createConnection();
            const [results] = await connection.execute(query, params);
            return results;
        } catch (error) {
            console.error(`Query poging ${attempt + 1} mislukt:`, error.message);
            attempt++;
            if (attempt >= maxRetries) {
                await sendToDevChannel(`Mislukte query na ${maxRetries} pogingen:\n\`\`\`${query}\`\`\`\nParameters: ${JSON.stringify(params)}\nFoutmelding: ${error.message}`);
            }
        } finally {
            if (connection) {
                await connection.end();
            }
        }
    }
    return null;
}

module.exports = { executeQuery };
