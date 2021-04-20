// import npm libraries
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev', {
    immediate: true,
}));

//middlewares ==> 3rd party library
const cors = require('cors') // to call apis from postman or other restricted domains https://auth0.com/blog/cors-tutorial-a-guide-to-cross-origin-resource-sharing/
app.use(cors());
const bodyParser = require('body-parser'); // ==> to parse the information in req.body in json format
app.use(bodyParser.json()); // parse data in json format within req.body ==> https://www.npmjs.com/package/body-parser

var cookieParser = require('cookie-parser');
// load the cookie-parsing middleware
app.use(cookieParser());


//import local files
const authRoute = require('./Routes/auth');
const userRoute = require('./Routes/user');
const categoryRoute = require('./Routes/category');
const productRoute = require('./Routes/product');
const orderRoute = require('./Routes/order');

//routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/product/", productRoute);
app.use("/order/", orderRoute);


// declaration of mongodb and create connection
const mongoose = require('mongoose');
// actual database link is stored into process.env.DATABASE valriable
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, // setting it false, prevents connecting (docs)
    useCreateIndex: true, // uses mongo default indexing process for every new entry (docs)
    useUnifiedTopology: true // helps to maintain a stable connection (docs)
}).then(() => console.log(`DB CONNECT ON PORT 27017 \n\n\n\n`)).catch(err => handleError("hi" + err)); // docs ==> if db cinnects successfull, calls the then call back else catches the error and handle it accordingly.

const port = 8000; // port no, in which our backend server will run

app.get("/", (req, res) => res.send("Hello World!!"));

app.listen(port, () => console.log(`app hello world is running at port no: ${port}`));