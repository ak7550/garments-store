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
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
var cookieParser = require('cookie-parser');
// load the cookie-parsing middleware
app.use(cookieParser());


//import local files
const authRoute = require('./Routes/auth');
const userRoute = require('./Routes/user');
const categoryRoute = require('./Routes/category');
const productRoute = require('./Routes/product');
const orderRoute = require('./Routes/order');
const cartRoute = require('./Routes/cart');

//routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/cart", cartRoute);


// declaration of mongodb and create connection
const mongoose = require('mongoose');
// actual database link is stored into process.env.DATABASE valriable
mongoose.connect(process.env.ONLINEDB, {
    useNewUrlParser: true, // setting it false, prevents connecting (docs)
    useCreateIndex: true, // uses mongo default indexing process for every new entry (docs)
    useUnifiedTopology: true, // helps to maintain a stable connection (docs)
    useFindAndModify: false //docs: https://mongoosejs.com/docs/deprecations.html#findandmodify
}).then(() => console.log(`DB CONNECTED \n\n\n\n`)).catch(err => handleError("hi" + err));


// docs ==> if db cinnects successfull, calls the then call back else catches the error and handle it accordingly.

const port = process.env.PORT || 8000; // port no, in which our backend server will run

// app.get("/", (req, res) => res.send("Hello World!!"));

if (process.env.NODE_ENV === 'production') {
    //serve static files
app.use(express.static("garments-store-frontend/build"));

    const path = require('path');

    //for any other request that is not in routes
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'garments-store-frontend', 'build', 'index.html'));
    })
}

app.listen(port, () => console.log(`app hello world is running at port no: ${port}`));