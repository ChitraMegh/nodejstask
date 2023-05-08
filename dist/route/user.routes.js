"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("mysql"));
const usersRouter = (0, express_1.Router)();
usersRouter.get('/', (request, response) => {
    return response.json("ok");
});
usersRouter.get('/details/:id', (req, res) => {
    var pool = mysql_1.default.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        connectionLimit: 10,
        multipleStatements: true
    });
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log('entered into error');
            console.log(err);
            res.send({
                success: false,
                statusCode: 500,
                message: 'getting error during the connection'
            });
            return;
        }
        console.log('the id: ' + req.params.id);
        //  if you gotconnection..
        conn.query('SELECT*FROM actor WHERE actor_id=?', [req.params.id], function (err, rows) {
            if (err) {
                conn.release();
                return res.send({
                    success: false,
                    statusCode: 400
                });
            }
            res.send({
                message: "success",
                statusCode: 200,
                data: rows
            });
            conn.release(); //close connection
        });
    });
});
usersRouter.post('/Id/:id/Name/:name', (req, res) => {
    res.send({
        data: req.body,
        params: {
            id: req.params.id,
            name: req.params.name
        }
    });
});
usersRouter.post("/register", (req, res) => {
    var pool = mysql_1.default.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        connectionLimit: 10,
        multipleStatements: true
    });
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log('entered into error');
            console.log(err);
            res.send({
                success: false,
                statusCode: 500,
                message: 'getting error during the connection'
            });
            return;
        }
        console.log('line 91');
        console.log(req.body);
        let sqlQuery = 'call regisrtation(?,?,?)';
        conn.query(sqlQuery, [req.body.email, req.body.phone, req.body.password], function (err, row) {
            if (err) {
                conn.release();
                return res.send({
                    success: false,
                    statuscode: 400,
                });
            }
            console.log('line 100');
            console.log(req.body);
            res.send({
                message: 'success',
                statuscode: 200,
            });
            conn.release();
        });
    });
});
exports.default = usersRouter;
