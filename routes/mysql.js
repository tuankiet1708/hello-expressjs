const express = require('express');
const mysql = express.Router()
const connection = require("../database/mysql");

mysql.get('/employee/list', function (req, res) { // /mysql/employee/list
    connection.query('SELECT * FROM employee', (err, rows, fields) => {
        if (err) throw err

        const nameList = rows.map(item => item.emp_name);

        res.send({
            data: nameList,
            fields: fields.map(item => item.name)
        });
    })
})

mysql.get('/employee/:id', function (req, res) { // /mysql/employee/list
    connection.query(`SELECT * FROM employee WHERE emp_id = ?`, [req.params.id], (err, rows, fields) => {
        if (err) throw err

        try {
            res.send({
                data: rows[0],
                fields: fields.map(item => item.name)
            });
        }
        catch (err) {
            res.send({
                error: "Something went wrong. Please try again!"
            });
        }
    })
})

module.exports = mysql;