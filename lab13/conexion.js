const express = require('express');
const mysql = require('lab9');

const app = express();

let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'lab9'
});

conn.connect(function(err){
    if(err) throw err;
    console.log("Conexion exitosa a la base de datos");
});

