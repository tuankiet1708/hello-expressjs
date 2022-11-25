const mysqlDb = require('mysql')

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE
} = process.env;

console.log("@@@ env @@@", process.env);

const connection = mysqlDb.createPool({
  host: MYSQL_HOST,
  user:  MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE
})

module.exports = connection;