// eslint-disable-next-line no-undef,@typescript-eslint/no-var-requires
const sqlite3 = require('sqlite3').verbose();
// eslint-disable-next-line no-undef,@typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line no-undef,@typescript-eslint/no-var-requires
const path = require('path');

// eslint-disable-next-line no-undef
const db = new sqlite3.Database(path.join(process.cwd(), "data", 'db'), (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

const allSQL = `
SELECT
    tbl_users.pk_users,
    tbl_users.username,
    GROUP_CONCAT(tbl_sessions.token) AS tokens,
    tbl_users.password_hash
FROM
    tbl_users
JOIN tbl_sessions ON tbl_users.pk_users = tbl_sessions.user_fk
GROUP BY
    pk_users
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