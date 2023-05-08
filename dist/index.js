"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const route_1 = __importDefault(require("./route"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(route_1.default);
// app.get('/details/:id', (req:Request, res:Response) => {
//     var pool = mysql.createPool({
//         host : process.env.HOST,
//         user : process.env.USER,
//         password : process.env.PASSWORD,
//         database : process.env.DATABASE,
//         connectionLimit  : 10,
//         multipleStatements : true 
//     })
//     pool.getConnection(function(err :any, conn: any){
//         if(err)
//         {
//             console.log('entered into error')
//             console.log(err)
//             res.send({
//                 success:false,
//                 statusCode : 500,
//                 message: 'getting error during the connection'
//             })
//             return;
//         }
//         console.log('the id: '+req.params.id);
//         //  if you gotconnection..
//         conn.query('SELECT*FROM actor WHERE actor_id=?', [req.params.id], function(err : any , rows : any ){
//             if(err){
//                 conn.release();
//                 return res.send({
//                     success : false,
//                     statusCode: 400
//                 });
//             }
//             res.send({
//                 message: "success",
//                 statusCode:200,
//                 data: rows 
//             });
//             conn.release();    //close connection
//         } )  
//     })
//     // res.send({
//       //  message: "hello world",
//         //Id: req.params.id,
//         //Name: req.params.name,
//     //});
// })
// app.post ("/register", ( req: Request, res: Response) => {
//     var pool = mysql.createPool({
//         host : process.env.HOST,
//         user : process.env.USER,
//         password : process.env.PASSWORD,
//         database : process.env.DATABASE,
//         connectionLimit  : 10,
//         multipleStatements : true         
//     });
//     pool.getConnection(function(err :any, conn: any){
//                 if(err)
//                 {
//                     console.log('entered into error')
//                     console.log(err)
//                     res.send({
//                         success:false,
//                         statusCode : 500,
//                         message: 'getting error during the connection'
//                     })
//                     return;
//                 }
//                 console.log('line 91')
//                 console.log(req.body)
//                 let sqlQuery = 'call regisrtation(?,?,?)';
//                 conn.query(sqlQuery, [req.body.phone, req.body.password], function(err:any , row:any){
//                     if (err){
//                         conn.release();
//                         return response.send({
//                             success: false,
//                         statuscode: 400,
//                         });   
//                     }
//                     console.log('line 100')
//                     console.log(req.body)
//                     res.send({
//                                message: 'success',
//                                statuscode: 200,
//                             });
//                             conn.release();
//                 })
//             });
//         })
app.post('/Id/:id/Name/:name', (req, res) => {
    res.send({
        data: req.body,
        params: {
            id: req.params.id,
            name: req.params.name
        }
    });
});
app.listen(process.env.PORT, () => {
    console.log('The application is listening on port ${process.env.PORT}!');
});
