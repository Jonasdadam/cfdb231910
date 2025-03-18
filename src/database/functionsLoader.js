const fs = require('fs');
const path = require('path');

const dbFunctions = {};
const dbFunctionsPath = path.join(__dirname, 'DBfunctions'); // Pad naar de DBfunctions map

// Lees alle bestanden in DBfunctions en laad ze dynamisch in
fs.readdirSync(dbFunctionsPath).forEach(file => {
    if (file.endsWith('.js')) {
        const moduleName = path.basename(file, '.js'); // Haal de bestandsnaam zonder extensie
        dbFunctions[moduleName] = require(path.join(dbFunctionsPath, file)); // Importeer het bestand
    }
});

module.exports = dbFunctions;
