const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const path = require('path');
const initDB = require('./initDB');
const LoadDB = require('./loadDB');
const exportDB = require('./exportDB');
const becrypt = require('bcryptjs');


initDB(() => {
    LoadDB(() => {
        exportDB(() => {
            console.log('Database loaded and exported.');
        });
    });
});


const app = express();
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // dd.mm.yyyy hh:mm:ss.ms
    const time = new Date().toLocaleString('en-GB', {timeZone: 'UTC'}).replace(/T/, ' ').replace(/\..+/, '');
    const ms = new Date().getMilliseconds();
    console.log(time, ms, req.method, req.url, req.body)
    next();
});
app.use(express.json({limit: '10mb'}));


const db = new sqlite3.Database(path.join(process.cwd(), "data", 'db'), (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

app.post('/admin/login', (req, res) => {
    const {username, password} = req.body;
    db.get(`SELECT * FROM tbl_users WHERE username = ?`, [username], (err, row) => {
        if (err) {
            res.json({
                message: "error"
            });
        } else {
            if (row) {
                if (becrypt.compareSync(password, row.password_hash)) {
                    db.serialize(() => {
                        db.run(`DELETE FROM tbl_sessions WHERE user_fk = ?`, [row.pk_users]);
                        const token = Math.random().toString(36).substring(2, 34);
                        db.run(`INSERT INTO tbl_sessions (user_fk, token, valid_until) VALUES (?, ?, ?)`, [row.pk_users, token, Date.now() + 3600000,]);
                        res.json({
                            message: "success",
                            data: row,
                            token: token,
                            valid: true
                        });
                    });
                } else {
                    res.json({
                        message: "failure",
                        valid: false
                    });
                }
            } else {
                res.json({
                    message: "failure",
                });
            }
        }
    });
});

app.post('/admin/session', (req, res) => {
    const token = req.body.token;
    db.get(`SELECT * FROM tbl_sessions WHERE token = ? and valid_until > ?`, [token, Date.now()], (err, row) => {
        if (err) {
            res.json({
                message: "error"
            });
        } else {
            if (row) {
                res.json({
                    message: "success",
                    data: row,
                    valid: true
                });
            } else {
                res.json({
                    message: "failure",
                    valid: false
                });
            }
        }
    });
});


app.get('/sites', (req, res) => {
    const allSQL = `
SELECT
    tbl_sites.pk_sites,
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
            res.json({
                message: "success",
                data: rows
            });
        });
    });
});


app.get('/categories', (req, res) => {
    db.all(`SELECT * FROM tbl_categories`, (err, rows) => {
        if (err) {
            console.error(err.message);
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});

app.get('/languages', (req, res) => {
    db.all(`SELECT * FROM tbl_languages`, (err, rows) => {
        if (err) {
            console.error(err.message);
            return;
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});

app.post('/visits', (req, res) => {
    const pk_sites = req.body.pk_sites;
    const date_visited = Date.now();
    db.run(`INSERT INTO tbl_sites_visited (site_fk, date_visited) VALUES (?, ?)`, [pk_sites, date_visited], (err) => {
        if (err) {
            res.json({
                message: "error"
            });
        } else {
            res.json({
                message: "success"
            });
        }
    });
});

app.get('/*', (req, res) => {
    res.json({
        messsage: "not found"
    });
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});