// import npm libraries
const express = require('express');
const app = express();

//import local files
const authRoute = require('./Routes/auth');


//routes
app.use("/", authRoute);



const port = 8000; // port no, in which our backend server will run

// declaration of mongodb and create connection
const mongoose = require('mongoose');
// actual database link is stored into process.env.DATABASE valriable
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, // setting it false, prevents connecting (docs)
    useCreateIndex: true, // uses mongo default indexing process for every new entry (docs)
    useUnifiedTopology: true // helps to maintain a stable connection (docs)
}).then(() => console.log(`db connected successfully on port 27017`)).catch(err => handleError(err)); // docs ==> if db cinnects successfull, calls the then call back else catches the error and handle it accordingly.


app.get("/", (req, res) => res.send("Hello World!!"));

app.listen(port, () => console.log(`app is running at port no: ${port}`));