const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

function ExportDB(callback) {
    const db = new sqlite3.Database(path.join(process.cwd(), "data", 'db'), (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    const allSQL = `
SELECT
    tbl_sites.name,
    tbl_sites.url,
    tbl_sites.icon,
    (SELECT tbl_categories.name FROM tbl_categories WHERE tbl_sites.category_fk = tbl_categories.pk_categories) AS category,
    tbl_sites.languages
FROM
    tbl_sites
ORDER BY
    tbl_sites.name
`;

    db.serialize(() => {
        db.all(allSQL, (err, rows) => {
            if (err) {
                console.error(err.message);
                return;
            }

            // Process the rows to convert the languages string into an array
            rows.forEach(row => {
                row.languages = row.languages.split(',').map(lang => lang.trim());
            });

            // eslint-disable-next-line no-undef
            fs.writeFileSync(path.join(process.cwd(), "data", "sites.json"), JSON.stringify(rows));
        });
    });
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
        callback();
    });
}

module.exports = ExportDB;