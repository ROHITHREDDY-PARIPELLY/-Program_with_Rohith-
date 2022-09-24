const {Pool,Client} = require('pg')
const pool=new Pool({
    user:"postgres",
    host:"localhost",
    database:"onlinevidya by rohith",
    password:"@7780586887",
    port:5432
})
pool.query("SELECT * from students",(err,res)=>{
    console.log(err,res)
    pool.end()
})