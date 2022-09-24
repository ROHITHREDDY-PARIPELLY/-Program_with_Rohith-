                                       // Inserting Students Data to postgreSQL using Node JS


// First install pg package using command " npm install pg "
// install express js using command " npm install express "


const {Pool,Client} = require('pg')
const pool=new Pool({
    user:"postgres",
    host:"localhost",
    database:"onlinevidya by rohith",
    password:"@7780586887",
    port:5432
})
pool.query("INSERT INTO students(name,phone,email,course)values('Rohith',7780586887,'rohithreddyparipelly@gmail.com','Web Development')",(err,res)=>{
    console.log(err,res)
    pool.end()
})
pool.query("INSERT INTO students(name,phone,email,course)values('Praveen',8735492051,'praveen45@gmail.com','React JS')",(err,res)=>{
    console.log(err,res)
    pool.end()
})
pool.query("INSERT INTO students(name,phone,email,course)values('Nikitha',7340643295,'niks563@gmail.com','Angular JS')",(err,res)=>{
    console.log(err,res)
    pool.end()
})
pool.query("INSERT INTO students(name,phone,email,course)values('Ajay',9398653065,'ajaybs@gmail.com','Artificial Intelligence')",(err,res)=>{
    console.log(err,res)
    pool.end()
})
pool.query("INSERT INTO students(name,phone,email,course)values('Sam',6453109846,'sam6569@gmail.com','Digital Marketing')",(err,res)=>{
    console.log(err,res)
    pool.end()
})
pool.query("INSERT INTO students(name,phone,email,course)values('Sneha',9000381840,'snehareddy@gmail.com','Java')",(err,res)=>{
    console.log(err,res)
    pool.end()
})
pool.query("INSERT INTO students(name,phone,email,course)values('Ramya',9898757543,'ramya43@gmail.com','Python')",(err,res)=>{
    console.log(err,res)
    pool.end()
})
pool.query("INSERT INTO students(name,phone,email,course)values('Madhuri',6300846290,'msmadhuri@gmail.com','Data structures')",(err,res)=>{
    console.log(err,res)
    pool.end()
})
pool.query("INSERT INTO students(name,phone,email,course)values('Mahesh',9658318070,'maheshreddy@gmail.com','Cyber Security')",(err,res)=>{
    console.log(err,res)
    pool.end()
})
pool.query("INSERT INTO students(name,phone,email,course)values('Bhargavi',9965694301,'bhargavi90@gmail.com','Full stack development')",(err,res)=>{
    console.log(err,res)
    pool.end()
})