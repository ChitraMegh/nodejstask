import express, { response } from 'express';
import { Request, Response } from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

import routes from './route';

const app = express();
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(routes);


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


app.post('/Id/:id/Name/:name', (req:Request, res:Response) => {
    res.send({
        data: req.body,
        params: {
            id: req.params.id,
            name: req.params.name
        }
    });
})

app.listen(process.env.PORT, () => {
    console.log('The application is listening on port ${process.env.PORT}!');
})
