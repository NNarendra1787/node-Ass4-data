const express = require('express');
const  route = require("./ragister.js")
const cors = require('cors')

const dotenv = require('dotenv');
dotenv.config()

const App = express();

App.use(cors({origin: "*"}))

App.use(express.json())

App.use("/Client", route);

App.listen(3215, ()=>{
    console.log("Server is live on Port 3215");
})

// mylink - https://node-assign4-data.onrender.com
