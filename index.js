const express = require('express');
const  route = require("./ragister.js")
const App = express();

App.use(express.json())

App.use("/Client", route);

App.listen(3215, ()=>{
    console.log("Server is live on Port 3215");
})