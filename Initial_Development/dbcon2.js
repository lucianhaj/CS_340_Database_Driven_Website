var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_muthanna',
  password        : '8276',
  database        : 'cs340_muthanna'
});

module.exports.pool = pool;
