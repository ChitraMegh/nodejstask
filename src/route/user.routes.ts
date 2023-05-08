import { Router, Request, Response } from "express";
import mysql from 'mysql';

const usersRouter = Router()
usersRouter.get('/', (request: Request, response: Response) =>
{
    return response.json("ok");
});

usersRouter.get('/details/:id', (req:Request, res:Response) => {
    
    var pool = mysql.createPool({
        host : process.env.HOST,
        user : process.env.USER,
        password : process.env.PASSWORD,
        database : process.env.DATABASE,
        connectionLimit  : 10,
        multipleStatements : true 
    })
        

    

    pool.getConnection(function(err :any, conn: any){
        if(err)
        {
            console.log('entered into error')
            console.log(err)
            res.send({
                success:false,
                statusCode : 500,
                message: 'getting error during the connection'
            })
            return;
        
        }
        console.log('the id: '+req.params.id);
       

        //  if you gotconnection..
        conn.query('SELECT*FROM actor WHERE actor_id=?', [req.params.id], function(err : any , rows : any ){

            if(err){
                conn.release();
                return res.send({
                    success : false,
                    statusCode: 400

                });
            }
            res.send({
                message: "success",
                statusCode:200,
                data: rows 
            });
            conn.release();    //close connection
        } )  

       
    })

});

usersRouter.post('/Id/:id/Name/:name', (req:Request, res:Response) => {
    res.send({
        data: req.body,
        params: {
            id: req.params.id,
            name: req.params.name
        }
    });
})


usersRouter.post ("/register", ( req: Request, res: Response) => {
    
    var pool = mysql.createPool({
        host : process.env.HOST,
        user : process.env.USER,
        password : process.env.PASSWORD,
        database : process.env.DATABASE,
        connectionLimit  : 10,
        multipleStatements : true         
    });
    
    pool.getConnection(function(err :any, conn: any){
                if(err)
                {
                    console.log('entered into error')
                    console.log(err)
                    res.send({
                        success:false,
                        statusCode : 500,
                        message: 'getting error during the connection'
                    })
                    return;
                }
                console.log('line 91')
                console.log(req.body)
                let sqlQuery = 'call regisrtation(?,?,?)';


                conn.query(sqlQuery, [ req.body.email,  req.body.phone, req.body.password], function(err:any , row:any){
                    if (err){
                        conn.release();
                        return res.send({
                            success: false,
                        statuscode: 400,

                        });   

                    }

                    console.log('line 100')
                    console.log(req.body)
                    res.send({
                               message: 'success',
                               statuscode: 200,
                            });
                            conn.release();
                })
            });
        
        

        });

export default usersRouter;