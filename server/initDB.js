// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const sqlite3 = require("sqlite3");
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const bcrypt = require('bcrypt');
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const dotenv = require('dotenv');
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const path = require('path');


function InitDB(callback) {
    dotenv.config();
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
    const db = new sqlite3.Database(path.join(process.cwd(), "data", 'db'), (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    db.serialize(() => {
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

        // Create necessary database tables with foreign key constraints
        db.run(`CREATE TABLE IF NOT EXISTS tbl_users (pk_users INTEGER PRIMARY KEY, username TEXT, password_hash TEXT)`);
        db.run(`CREATE TABLE IF NOT EXISTS tbl_sites (pk_sites INTEGER PRIMARY KEY, name TEXT, url TEXT, icon TEXT, category_fk INTEGER, languages TEXT, FOREIGN KEY (category_fk) REFERENCES tbl_categories(pk_categories))`);
        db.run(`CREATE TABLE IF NOT EXISTS tbl_categories (pk_categories INTEGER PRIMARY KEY, name TEXT)`);
        db.run(`CREATE TABLE IF NOT EXISTS tbl_sessions (pk_sessions INTEGER PRIMARY KEY, user_fk INTEGER, token TEXT, valid_until INTEGER, FOREIGN KEY (user_fk) REFERENCES tbl_users(pk_users))`);
        db.run(`CREATE TABLE IF NOT EXISTS tbl_sites_visited (pk_sites_visited INTEGER PRIMARY KEY, site_fk INTEGER, date_visited INTEGER, FOREIGN KEY (site_fk) REFERENCES tbl_sites(pk_sites))`);
        // Insert admin user into tbl_users
        db.run(`INSERT INTO tbl_users (username, password_hash) VALUES (?, ?)`, [adminUsername, hashedPassword]);
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