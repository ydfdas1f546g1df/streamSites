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
    GROUP_CONCAT(tbl_languages.name) AS languages
FROM
    tbl_sites
JOIN
    tbl_sites_languages ON tbl_sites.pk_sites = tbl_sites_languages.site_fk
JOIN
    tbl_languages ON tbl_sites_languages.language_fk = tbl_languages.pk_languages
WHERE
    tbl_sites_languages.site_fk = tbl_sites.pk_sites
GROUP BY
    tbl_sites.name,
    tbl_sites.url,
    tbl_sites.icon,
    tbl_sites.category_fk
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
                row.languages = row.languages.split(',');
            });

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