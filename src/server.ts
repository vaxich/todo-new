import React, {useState} from 'react';

var express = require('express'); // оснастка веб сервера
var app = express();
var sql = require('mssql'); // клиент для MS SQL Server

// строка для подключения к базе данных.
var sqlConfig = {
    user: 'UserName',
    password: 'mot de passe',
    server: 'localhost',
    database: 'DatabaseName'
}

// сервер для http://localhost:8081/
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("сервер доступен по url http://%s:%s", host, port)
});