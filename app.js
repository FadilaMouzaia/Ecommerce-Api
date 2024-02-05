const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config()
const authJwt = require('./middlewares/jwt');
const errorHandler = require('./middlewares/error-handler');


app.use(cors());
app.options('*', cors())

//middleware
app.use(express.json());
app.use(morgan());
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');



app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/orders", ordersRoutes);

//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

//Server
app.listen(3000, ()=>{

    console.log('server is running http://localhost:3000');
})