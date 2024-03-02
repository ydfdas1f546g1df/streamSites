const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');


const db = new sqlite3.Database('db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

const allSQL = `
SELECT
    *
FROM
    tbl_users
`;

db.serialize(() => {
    db.all(allSQL, (err, rows) => {
        if (err) {
            console.error(err.message);
            return;
        }

        // Process the rows to convert the languages string into an array

        fs.writeFileSync('users.json', JSON.stringify(rows));
    });
});
