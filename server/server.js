// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const cors = require('cors');
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const sqlite3 = require('sqlite3');
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const initDB = require('./initDB');
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const LoadDB = require('./loadDB');
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const exportDB = require('./exportDB');
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const becrypt = require('bcryptjs');


initDB(() => {
    console.log('[ STATUS ] - Database initialized.')
    LoadDB(() => {
        console.log('[ STATUS ] - Database loaded.')
        exportDB(() => {
            console.log('[ STATUS ] - Database exported.')
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
    console.log(time + "." + ms, req.method, req.url, req.body, "IP:", req.ip.split(":").pop());
    next();
});
app.use(express.json({limit: '10mb'}));


// eslint-disable-next-line no-undef
const db = new sqlite3.Database(path.join(process.cwd(), "data", 'db'), (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

const authenticate = (token, callback) => {
    db.get(`SELECT * FROM tbl_sessions WHERE token = ? and valid_until > ?`, [token, Date.now()], (err, row) => {
        if (err) {
            callback(false);
        } else {
            if (row) {
                callback(true);
            } else {
                callback(false);
            }
        }
    });
}

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

app.post('/requests', (req, res) => {
    const {start, end, search, token} = req.body
    let allSQL = `
SELECT
    tbl_site_requests.pk_site_requests as pk_sites,
    tbl_site_requests.name,
    tbl_site_requests.url,
    tbl_site_requests.icon,
    tbl_categories.name as category,
    tbl_site_requests.languages
FROM
    tbl_site_requests
JOIN
    tbl_categories ON tbl_site_requests.category_fk = tbl_categories.pk_categories
${search !== undefined ? `WHERE (tbl_site_requests.name LIKE '%${search}%' OR tbl_site_requests.url LIKE '%${search}%' OR tbl_site_requests.icon LIKE '%${search}%')` : ''}
ORDER BY
    tbl_site_requests.pk_site_requests
${start !== undefined && end !== undefined ? `LIMIT ${start}, ${end}` : ''}
`;
    authenticate(token, (valid) => {
        if (!valid) {
            res.json({
                message: "failure",
                valid: false
            });
            return;
        }
        db.serialize(() => {
            db.all(allSQL, (err, rows) => {
                if (err) {
                    console.error(err.message);
                    return;
                }
                rows.forEach(row => {
                    row.languages = row.languages.split(',').map(lang => lang.trim());
                });
                db.get(`SELECT COUNT(*) as count FROM tbl_site_requests`, (err, row) => {
                    if (err) {
                        console.error(err.message);
                        return;
                    }
                    res.json({
                        message: "success",
                        data: rows,
                        count: row.count
                    });
                });
            });
        });
    });
});


app.post('/sites', (req, res) => {
    const {start, end, search} = req.body
    let allSQL = `
SELECT
    tbl_sites.pk_sites,
    tbl_sites.name,
    tbl_sites.url,
    tbl_sites.icon,
    tbl_categories.name as category,
    tbl_sites.languages
FROM
    tbl_sites
JOIN
    tbl_categories ON tbl_sites.category_fk = tbl_categories.pk_categories
${search !== undefined ? `WHERE (tbl_sites.name LIKE '%${search}%' OR tbl_sites.url LIKE '%${search}%' OR tbl_sites.icon LIKE '%${search}%')` : ''}
ORDER BY
    tbl_sites.pk_sites
${start !== undefined && end !== undefined ? `LIMIT ${start}, ${end}` : ''}
`;


    // console.log(allSQL)
    db.serialize(() => {
        db.all(allSQL, (err, rows) => {
            if (err) {
                console.error(err.message);
                return;
            }
            rows.forEach(row => {
                row.languages = row.languages.split(',').map(lang => lang.trim());
            });
            db.get(`SELECT COUNT(*) as count FROM tbl_sites`, (err, row) => {
                if (err) {
                    console.error(err.message);
                    return;
                }
                res.json({
                    message: "success",
                    data: rows,
                    count: row.count
                });
            });
        });
    });
});

app.delete('/sites/delete', (req, res) => {
    const pk_sites = req.body.pk_sites;
    const token = req.body.token;
    authenticate(token, (valid) => {
        if (!valid) {
            res.json({
                message: "failure",
                valid: false
            });
            return;
        }
        db.run(`DELETE FROM tbl_sites WHERE pk_sites = ?`, [pk_sites], (err) => {
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
});

app.put('/sites/edit', (req, res) => {
    const {pk_sites, name, url, icon, category, languages} = req.body.data;
    const token = req.body.token;
    authenticate(token, (valid) => {
        if (!valid) {
            res.json({
                message: "failure",
                valid: false
            });
            return;
        }
        

        db.run(`UPDATE tbl_sites SET name = ?, url = ?, icon = ?, category_fk = (SELECT tbl_categories.pk_categories FROM tbl_categories WHERE tbl_categories.name = ?), languages = ? WHERE pk_sites = ?`, [name, url, icon, category, languages.join(","), pk_sites], (err) => {
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
});

app.post('/sites/add', (req, res) => {
    const {name, url, icon, category, languages} = req.body.data;
    const token = req.body.token;
    authenticate(token, (valid) => {
        if (!valid) {
            res.json({
                message: "failure",
                valid: false
            });
            return;
        }
        
        db.run(`INSERT INTO tbl_sites (name, url, icon, category_fk, languages) VALUES (?, ?, ?,(SELECT tbl_categories.pk_categories FROM tbl_categories WHERE tbl_categories.name = ?), ?)`, [name, url, icon, category, languages.join(",")], function (err) {
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
});

app.post('/sites/request', (req, res) => {
    const {name, url, icon, category, languages} = req.body.data;
    db.run(`INSERT INTO tbl_site_requests (name, url, icon, category_fk, languages) VALUES (?, ?, ?, (SELECT tbl_categories.pk_categories FROM tbl_categories WHERE tbl_categories.name = ?), ?)`, [name, url, icon, category, languages.join(",")], function (err) {
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

app.delete('/request/remove', (req, res) => {
    const pk_site_requests = req.body.pk_site_requests;
    const token = req.body.token;
    console.log()
    authenticate(token, (valid) => {
        if (!valid) {
            res.json({
                message: "failure",
                valid: false
            });
            return;
        }
        db.run(`DELETE FROM tbl_site_requests WHERE pk_site_requests = ?`, [pk_site_requests], (err) => {
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


app.post('/visits', (req, res) => {
    const pk_sites = req.body.pk_sites;
    const date_visited = Date.now();
    db.run(`INSERT INTO tbl_sites_visited (site_fk, date_visited, ip_address) VALUES (?, ?)`, [pk_sites, date_visited, req.ip.split(":").pop()], (err) => {
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
