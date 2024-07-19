const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const employeeModel = require('./models/Employee'); // Assuming this model is correctly defined

const app = express();
app.use(express.json()); 
app.use(cors()); 

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/emp");

app.post("/login",(req ,res)=>{
  const{email,password}=req.body;
  employeeModel.findOne({email: email})
  .then(user =>{
    if(user){
        if(user.password === password){
          res.json("Sucess")
      }else{
        res.json("Password is incorrect")
      }
    }else{
      res.json("No record exists")
    }
    })
})

app.post('/register', (req, res) => {
  // Assuming employeeModel is correctly defined with Mongoose
  employeeModel.create(req.body)
    .then(employee => res.json(employee)) // Respond with created employee data
    .catch(err => res.json(err)); // Handle errors
});


app.listen(3001, () => {
  console.log("Server is running ");
});
