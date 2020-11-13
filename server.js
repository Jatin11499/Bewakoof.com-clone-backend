require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8000;
const connection_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gwzcc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(express.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

    //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const productSchema = new mongoose.Schema({
    pid: String,
    imgUrl: String,
    productName: String,
    oldPrice: String,
    newPrice: String,
    gender: String
});

const Products = new mongoose.model("Product", productSchema);

app.get("/", (req,res,next) => {
    res.send("Hello");
});

app.post("/product/card", (req,res,next) => {
    const prod = req.body;

    Products.create(prod, (err, data) => {
        if(err){
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

app.get("/product/card", (req,res,next) => {
    const prod = req.body;

    Products.find(prod, (err, data) => {
        if(err){
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);    
});