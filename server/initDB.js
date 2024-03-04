// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const sqlite3 = require("sqlite3");
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const bcrypt = require('bcrypt');
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const dotenv = require('dotenv');
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const path = require('path');


function InitDB(callback) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
    dotenv.config();
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
    const db = new sqlite3.Database(path.join(process.cwd(), "data", 'db'), (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
    const adminPassword = process.env.ADMIN_PW;
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
    const adminUsername = process.env.ADMIN_USER;

    if (!adminPassword || !adminUsername) {
        console.error("Admin credentials are missing in environment variables.");
        return;
    }

    // Hash the admin password
    const hashedPassword = bcrypt.hashSync(adminPassword, 10);
    db.serialize(() => {

        // Create necessary database tables with foreign key constraints
        db.run(`CREATE TABLE IF NOT EXISTS tbl_users (pk_users INTEGER PRIMARY KEY, username TEXT, password_hash TEXT)`);
        db.run(`CREATE TABLE IF NOT EXISTS tbl_sites (pk_sites INTEGER PRIMARY KEY, name TEXT, url TEXT, icon TEXT, category_fk INTEGER, languages TEXT, FOREIGN KEY (category_fk) REFERENCES tbl_categories(pk_categories))`);
        db.run(`CREATE TABLE IF NOT EXISTS tbl_categories (pk_categories INTEGER PRIMARY KEY, name TEXT)`);
        db.run(`CREATE TABLE IF NOT EXISTS tbl_sessions (pk_sessions INTEGER PRIMARY KEY, user_fk INTEGER, token TEXT, valid_until INTEGER, FOREIGN KEY (user_fk) REFERENCES tbl_users(pk_users))`);
        db.run(`CREATE TABLE IF NOT EXISTS tbl_sites_visited (pk_sites_visited INTEGER PRIMARY KEY, site_fk INTEGER, date_visited INTEGER, ip_address TEXT, FOREIGN KEY (site_fk) REFERENCES tbl_sites(pk_sites))`);
        db.run(`CREATE TABLE IF NOT EXISTS tbl_site_requests (pk_site_requests INTEGER PRIMARY KEY, name TEXT, url TEXT, icon TEXT, category_fk INTEGER, languages TEXT, FOREIGN KEY (category_fk) REFERENCES tbl_categories(pk_categories))`);
    });
    // check if the admin user is already in the database
    db.get(`SELECT * FROM tbl_users WHERE username = ?`, [adminUsername], (err, row) => {
        if (err) {
            console.error(err.message);
            return;
        }
        if (row) {
            console.log('Admin user already exists.');
        } else {
            console.log('Admin user not found. Creating admin user...');
            db.run(`INSERT INTO tbl_users (username, password_hash) VALUES (?, ?)`, [adminUsername, hashedPassword]);
            console.log('Admin user created.');
        }
    });


    // Close the database connection
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
        callback();
    });
}
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
module.exports = InitDB;