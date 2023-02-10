const express = require('express');
const app=express();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const { urlencoded } = require('body-parser');

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database:"network"
});


app.use(express.urlencoded({extended: true}));
app.use(express.json());

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + db.threadId);
})

  app.get("/viewchat",(req,res)=>{
    const select = "SELECT Name FROM `student`";
    db.query(select,(err,result)=>{
       //  res.send(result);
       if(err){
        res.status(400).json(err);
      }
      if(result.length>0){
        res.json(result)
        res.status(200).json(result[0]);
      }
    });
});


app.delete("/api/delete/:name",(req,res)=>{
    const name = req.params.name;
    const deletes = "delete from mytable where name=?";
    db.query(deletes,name,(err,result)=>{
         if(err) console.log(err);
    res.json({ message: "User delete successfully" });

    });
});


app.post("/login",urlencoded,(req,res)=>{
  let data = [req.body.name,req.body.age];
  const sql = "select *from jase where name=? and age=?";
  db.query(sql,data,function(err,result){
    if(err){
      res.status(400).json(err);
    }
    if(result.length>0){
      res.status(200).json(result[0]);
    }
  })
});

app.post("/register",urlencoded,(req,res)=>{
  let data = [req.body.Name,req.body.Department,req.body.username,req.body.passowrd];
  const sql = "insert into student values(?,?,?,?,?)";
  db.query(sql,data,function(err,result){
    if(err){
      res.status(400).json(err);
    }
    if(result.length>0){
      res.status(200).json(result[0]);
    }
  })
});

app.post("/post",urlencoded,(req,res)=>{
  let data = [req.body.Name,req.body.Department,req.body.username,req.body.passowrd];
  const sql = "insert into post values(?,?,?,?,?)";
  db.query(sql,data,function(err,result){
    if(err){
      res.status(400).json(err);
    }
    if(result.length>0){
      res.status(200).json(result[0]);
    }
  })
});

app.post("/getpost",urlencoded,(req,res)=>{
  const sql = "select *from post";
  db.query(sql,function(err,result){
    if(err){
      res.status(400).json(err);
    }
    if(result.length>0){
      res.status(200).json(result[0]);
    }
  })
});

app.put("/api/update/",(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "123456");

    const newval = req.body.newval;
    const key = req.body.keys;
    const update =  "update mytable set name=? where name=?";
    db.query(update,[newval,key],(err,result)=>{
         console.log(newval," ",key)
        res.json({ message: "User Update successfully" });

    });

});









app.post("/auth", (req, res) => {
    // Verify the user's credentials
    // ...
  
    // Generate the JWT
    const token = jwt.sign({ userId: user._id }, "secretKey");
  
    // Send the JWT back to the client
    res.json({ token });
  });

app.listen(3000,()=>{
    console.log('Running on port 3000');
});
 