const express = require('express')
const app = express()
const port = 5550
const mongoose = require("mongoose")
require('ejs')
        
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))

let URI = "mongodb+srv://idowuvictor18:eMFjALzBS7B3tpVR@cluster0.whlbvhd.mongodb.net/victor_db?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(URI)
.then (()=>{
    console.log("Connected to MongoDB");
    
})
.catch((err)=>{
    console.error("MongoDB connection error:", err);
    
})
// In databases, a schema defines the structure/shape of your data. 
// schema is like a blueprint for your database documents.

let customerSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true,
    unique: [true, "Email has been taken, please choose another one"
    ]},
    password: {type: String, required: true}
});

// schema = structure & rules of your MongoDB document 

// model = actual object you use to interract with MongoDB 

let customerModel = mongoose.model("Customer", customerSchema);

let allCustomers=[];
app.get('/signup',(req,res)=>{
    res.render('signup')
});

app.post('/register', (req,res)=>{
    console.log(req.body)
    // res.send('welcome')
    // allCustomer.push(req.body)
    let newCustomer = new customerModel(req.body);
    newCustomer.save()
    .then(() => {
        // res.send("registration successful!");
        res.redirect("/dashboard");
    })
    .catch((err) => {
        console.error("error registering customer:", err);
        
    });

})


app.get("/signin", (req, res) => {
    res.render('signin');
});
app.post("/login", (req,res)=>{
    res.send("Confirmed again")
})

app.get("/dashboard", (req, res) => {
    customerModel.find()
    .then((data)=>{
        console.log(data);
        allCustomers = data;
        res.render('index', {allCustomers});
    })
    .catch((err) => {
        console.error("Error fetching customers", err);
        res.status(500).send("Internal server error");
    });
});

app.listen(port, (req,res)=>{
    console.log(`server started at ${port} `);
    
})