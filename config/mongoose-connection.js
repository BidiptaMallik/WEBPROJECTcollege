const mongoose = require('mongoose');
const config = require("config");
const dbgr = require("debug")("development:mongoose");


const connectionString = process.env.MONGODB_URI || `${config.get("MONGODB_URI")}/WEB2`;

mongoose
.connect(connectionString)
.then(function(){
  dbgr("connected");
  console.log("Database connected successfully"); 
})
.catch(function(err){
  dbgr(err);
  console.log("Database connection error:", err);
})

module.exports = mongoose.connection;