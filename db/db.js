const { Pool } = require('pg');

// put this to config.js as private
const connectionString = 'postgres://kdwwkdov:MvpENPMUGmeL0DEuRMZWTt2YfIHK6-r5@salt.db.elephantsql.com:5432/kdwwkdov';

const pool = new Pool({
  connectionString
});

module.exports = pool;
