const mysqlDb = require('mysql')
const connection = mysqlDb.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'quanlynhanvien'
})

module.exports = connection;