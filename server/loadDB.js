const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

function LoadDB(callback) {
    const db = new sqlite3.Database(path.join(process.cwd(), "data", 'db'), (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });
    
    // check if the database is already populated
    db.get(`SELECT * FROM tbl_sites`, (err, row) => {
        if (err) {
            console.error(err.message);
            return;
        }
        if (row) {
            console.log('Database already populated.');
            db.close((err) => {
                if (err) {
                    console.error(err.message);
                }
                console.log('Closed the database connection.');
                callback();
            });
            return;
        }
        console.log('Database not populated. Populating database...');
    });

    const fileData = fs.readFileSync(path.join(process.cwd(), 'data', 'data.json'));
    const data = JSON.parse(fileData);
    const languages = [...new Set(data.map(site => site.languages).flat())];
    const categories = [...new Set(data.map(site => site.category))];

    db.serialize(() => {
        languages.forEach(language => {
            db.run(`INSERT INTO tbl_languages (name) VALUES (?)`, [language]);
        });

        categories.forEach(category => {
            db.run(`INSERT INTO tbl_categories (name) VALUES (?)`, [category]);
        });

        data.forEach(site => {
            db.run(`INSERT INTO tbl_sites (name, url, icon, category_fk) VALUES (?, ?, ?, (SELECT pk_categories FROM tbl_categories WHERE name = ?))`, [site.name, site.url, site.icon, site.category]);
            site.languages.forEach(language => {
                db.run(`INSERT INTO tbl_sites_languages (site_fk, language_fk) VALUES ((SELECT pk_sites FROM tbl_sites WHERE name = ?), (SELECT pk_languages FROM tbl_languages WHERE name = ?))`, [site.name, language]);
            });
        });
        console.log('Data loaded into database.');
    });
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
        callback();
    });
}

module.exports = LoadDB;